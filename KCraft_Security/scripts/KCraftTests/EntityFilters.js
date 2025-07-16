import {world} from "mojang-minecraft";

function EntityFilters(){
    world.events.tick.subscribe((gt) => {
        if (gt % 2 === 0) {
            for (const player of world.getPlayers()) {
                if (player.hasTag(`ban`)) {
                    player.runCommand(`kick "${player.name}" Sorry, you have been banned from §l§5KingdomCraft§6 3§r`)
                } else if (!player.hasTag(`${player.name}`)){
                    player.runCommand(`tag @s add "${player.name}"`)
                } else if (player.hasTag(`${player.name}`)) continue
            }
        }
    })
    //world.events.entityCreate.subscribe((ev)=>{
    //    let preEntity = ev.entity
    //    if (preEntity.id != 'minecraft:command_block_minecart')return
    //    const pE_X = Math.trunc(preEntity.location['x'])
    //    const pE_Y = Math.trunc(preEntity.location['y'])
    //    const pE_Z = Math.trunc(preEntity.location['z'])
    //    let pE_Coords = `${pE_X} ${pE_Y} ${pE_Z}`
    //    preEntity.dimension.runCommand(`tellraw @a {"rawtext":[{"text":"[§5§lKCraft Security§r] - ${preEntity.name} was a ${preEntity.id} and had been killed at ${pE_Coords}"}]}`)
    //})
    world.events.beforeDataDrivenEntityTriggerEvent.subscribe((preEvent)=>{
        let entity = preEvent.entity
        let event = preEvent.id
        const e_X = Math.round(entity.location.x*10)*0.1
        const e_Y = Math.round(entity.location.y*10)*0.1
        const e_Z = Math.round(entity.location.z*10)*0.1
        let e_Coords = `§f${e_X} §7${e_Y} §f${e_Z}§r`
        if (event === 'minecraft:exited_hive' && entity.id !== 'minecraft:bee') {
            entity.runCommand(`tp ~ -1000 ~`)
            entity.kill()
            entity.runCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"  [§5§lKCraft Security§r] - killed an illegally summoned entity.\n      [type:'§e${entity.id.replace('minecraft:','')}§r', name:'${entity.nameTag}§r', location:${e_Coords}]"}]}`)
        } else if (event === 'player_died') {
            console.warn(`Player: §a${entity.nameTag}§r's death location:${e_Coords}`)
        } else return
    })
    world.events.entityHurt.subscribe(({cause,damage,damagingEntity,hurtEntity,projectile})=>{
        let hp = hurtEntity.getComponent('minecraft:health').current
        if (damagingEntity && damagingEntity.id === 'minecraft:player') {
            let slot = damagingEntity.selectedSlot
            let item = damagingEntity.getComponent('minecraft:inventory').container.getItem(slot)
            world.getDimension('overworld').runCommand(`say §o§2${hurtEntity.name??''+hurtEntity.id.replace('minecraft:','')}§r took <§b${damage} ${cause}§r damage> from §o§2${damagingEntity.name??damagingEntity.id.replace('minecraft:','')}§r using their §3${(cause==='thorns')??item?.nameTag??item.id.replace('minecraft:','')}§r and it's at §d${hp}§rhitPoints`)
        } else world.getDimension('overworld').runCommand(`say §o§2${damagingEntity?.name??damagingEntity?.id.replace('minecraft:','')??''}§r dealt <§b${damage} ${cause}§r damage> on §o§2${hurtEntity.name??hurtEntity.id.replace('minecraft:','')}§r leaving §d${hp.toFixed(1)}§rHitPoints.`)
    })
}
EntityFilters ()

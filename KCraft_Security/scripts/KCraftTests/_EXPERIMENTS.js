import { world, EntityQueryOptions, GameMode } from 'mojang-minecraft'

function TestThis() {
    let Xloc = 0
    let Yloc = 0
    let Zloc = 0
    let Xvel = 0
    let Yvel = 0
    let Zvel = 0
    let velSpeed = 0
    let highAC = 0
    let speedTag = 0
    let s = 0

    world.events.tick.subscribe(({currentTick, deltaTime})=>{
        const c = new EntityQueryOptions()
        c.gameMode = 1
        if (currentTick % 5 === 0){
            for (const player of world.getPlayers(c)){
                    let locationSpeed = (Math.sqrt
                        (Math.abs( 
                            Math.pow((
                                Math.round(player.location.x)*1000 - 
                                Math.round(Xloc)*1000)/1000,2) + 
                            Math.pow((
                                Math.round(player.location.y)*1000 - 
                                Math.round(Yloc)*1000)/1000,2) + 
                            Math.pow((
                                Math.round(player.location.z)*1000 - 
                                Math.round(Zloc)*1000)/1000,2) )))
                    let locSpeed = `${((Math.round(locationSpeed*100)*2)*0.01)}`
                    //player.runCommand(`title @s actionbar §2${locSpeed}§rm/s\n§3§r\n${((deltaTime*100000)*0.1)*5}`)
    
                    let xV = `${(Math.abs(player.velocity.x).toFixed(3))*40}`
                    let yV = `${(player.velocity.y.toFixed(3))*40}`
                    let zV = `${(Math.abs(player.velocity.z).toFixed(3))*40}`
                    let X = Math.pow((player.velocity.x),2).toFixed(3)
                    let Y = Math.pow((player.velocity.y),2).toFixed(3)
                    let Z = Math.pow((player.velocity.z),2).toFixed(3)
                    let acceleration = `${(Math.sqrt(Math.pow(X,2) + Math.pow(Z,2))*(deltaTime*100)).toFixed(3)}`
                    let aveV = `${((xV+zV)/2)}`
                    player.runCommand(`title @s actionbar §2${aveV}§rm/s\n${player.velocity.x.toFixed(3)}\n${acceleration}\n${4-Math.round(deltaTime*100)}`)
    
                    Xloc = player.location.x
                    Yloc = player.location.y
                    Zloc = player.location.z
    
                    Xvel = player.velocity.x
                    Yvel = player.velocity.y
                    Zvel = player.velocity.z
                }
        }
        s = new Date().getTime()
    })
    world.events.beforeChat.subscribe((preChat)=>{
        let player = preChat.sender
        let message = preChat.message
        if (message.includes(`,mute`)) {
            preChat.cancel = true
            player.runCommand(`tag ${message.replace(',mute @','')} add muted`)
        } if (player.hasTag(`muted`)) {
            preChat.cancel = true
        } else preChat.cancel = false
    })
} TestThis()

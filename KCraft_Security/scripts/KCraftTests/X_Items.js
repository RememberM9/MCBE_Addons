import { ItemStack, MinecraftItemTypes, world, BlockLocation } from 'mojang-minecraft'

let voidSlot = new ItemStack(MinecraftItemTypes.air, 0, 0)
const xItems = [
    'acacia_standing_sign',
    'acacia_wall_sign',
    'agent_spawn_egg',
    'balloon',
    'bamboo_sapling',
    'birch_standing_sign',
    'birch_wall_sign',
    'black_candle_cake',
    'bleach',
    'blue_candle_cake',
    'boat',
    'brown_candle_cake',
    'bubble_column',
    'camera',
    'candle_cake',
    'carrots',
    'cave_vines',
    'cave_vines_body_with_berries',
    'cave_vines_head_with_berries',
    'chemical_heat',
    'chemistry_table',
    'client_request_placeholder_block',
    'cocoa',
    'colored_torch_bp',
    'colored_torch_rg',
    'compound',
    'coral_fan_hang',
    'coral_fan_hang2',
    'coral_fan_hang3',
    'crimson_standing_sign',
    'crimson_wall_sign',
    'cyan_candle_cake',
    'darkoak_standing_sign',
    'darkoak_wall_sign',
    'daylight_detector_inverted',
    'debug_stick',
    'dye',
    'element_0',
    'element_1',
    'element_10',
    'element_100',
    'element_101',
    'element_102',
    'element_103',
    'element_104',
    'element_105',
    'element_106',
    'element_107',
    'element_108',
    'element_109',
    'element_11',
    'element_110',
    'element_111',
    'element_112',
    'element_113',
    'element_114',
    'element_115',
    'element_116',
    'element_117',
    'element_127',
    'element_12',
    'element_13',
    'element_14',
    'element_15',
    'element_16',
    'element_17',
    'element_27',
    'element_19',
    'element_2',
    'element_20',
    'element_21',
    'element_22',
    'element_23',
    'element_24',
    'element_25',
    'element_26',
    'element_27',
    'element_28',
    'element_29',
    'element_3',
    'element_30',
    'element_31',
    'element_32',
    'element_33',
    'element_34',
    'element_35',
    'element_36',
    'element_37',
    'element_38',
    'element_39',
    'element_4',
    'element_40',
    'element_41',
    'element_42',
    'element_43',
    'element_44',
    'element_45',
    'element_46',
    'element_47',
    'element_48',
    'element_49',
    'element_5',
    'element_50',
    'element_51',
    'element_52',
    'element_53',
    'element_54',
    'element_55',
    'element_56',
    'element_57',
    'element_58',
    'element_59',
    'element_6',
    'element_60',
    'element_61',
    'element_62',
    'element_63',
    'element_64',
    'element_65',
    'element_66',
    'element_67',
    'element_68',
    'element_69',
    'element_7',
    'element_70',
    'element_71',
    'element_72',
    'element_73',
    'element_74',
    'element_75',
    'element_76',
    'element_77',
    'element_78',
    'element_79',
    'element_8',
    'element_80',
    'element_81',
    'element_82',
    'element_83',
    'element_84',
    'element_85',
    'element_86',
    'element_87',
    'element_88',
    'element_89',
    'element_9',
    'element_90',
    'element_91',
    'element_92',
    'element_93',
    'element_94',
    'element_95',
    'element_96',
    'element_97',
    'element_98',
    'element_99',
    'end_gateway',
    'end_portal',
    'fire',
    'flowing_lava',
    'flowing_water',
    'glow_stick',
    'glowingobsidian',
    'gray_candle_cake',
    'green_candle_cake',
    'hard_glass',
    'hard_glass_pane',
    'hard_stained_glass',
    'hard_stained_glass_pane',
    'ice_bomb',
    'info_update',
    'info_update2',
    'invisible_bedrock',
    'item.acacia_door',
    'item.bed',
    'item.beetroot',
    'item.birch_door',
    'item.brewing_stand',
    'item.cake',
    'item.camera',
    'item.campfire',
    'item.cauldron',
    'item.chain',
    'item.crimson_door',
    'item.dark_oak_door',
    'item.flower_pot',
    'item.frame',
    'item.glow_frame',
    'item.hopper',
    'item.iron_door',
    'item.jungle_door',
    'item.kelp',
    'item.nether_sprouts',
    'item.nether_wart',
    'item.reeds',
    'item.skull',
    'item.soul_campfire',
    'item.spruce_door',
    'item.warped_door',
    'item.wheat',
    'item.wooden_door',
    'jungle_standing_sign',
    'jungle_wall_sign',
    'lava',
    'lava_cauldron',
    'light_blue_candle_cake',
    'light_gray_candle_cake',
    'lime_candle_cake',
    'lit_blast_furnace',
    'lit_deepslate_redstone_ore',
    'lit_furnace',
    'lit_redstone_lamp',
    'lit_redstone_ore',
    'lit_smoker',
    'magenta_candle_cake',
    'medicine',
    'moving_block',
    'netherreactor',
    'npc_spawn_egg',
    'orange_candle_cake',
    'pink_candle_cake',
    'piston_arm_collision',
    'portal',
    'potatoes',
    'powder_snow',
    'powered_comparator',
    'powered_repeater',
    'pumpkin_stem',
    'purple_candle_cake',
    'rapid_fertilizer',
    'red_candle_cake',
    'redstone_wire',
    'reserved6',
    'soul_fire',
    'sparkler',
    'spawn_egg',
    'spruce_standing_sign',
    'spruce_wall_sign',
    'standing_banner',
    'standing_sign',
    'sticky_piston_arm_collision',
    'stonecutter',
    'sweet_berry_bush',
    'underwater_torch',
    'unknown',
    'unlit_redstone_torch',
    'unpowered_comparator',
    'unpowered_repeater',
    'wall_banner',
    'wall_sign',
    'warped_standing_sign',
    'warped_wall_sign',
    'water',
    'white_candle_cake',
    'yellow_candle_cake'
]
//Blocks allowed for public touch
const publicBlock = [
    'acacia_button',
    'birch_button',
    'crimson_button',
    'dark_oak_button',
    'jungle_button',
    'mangrove_button',
    'spruce_button',
    'polished_blackstone_button',
    'stone_button',
    'warped_button',
    'wooden_button',
    'lever',
    'bed',
    'barrel',
    'blast_furnace',
    'cartography_table',
    'crafting_table',
    'enchanting_table',
    'ender_chest',
    'grindstone',
    'loom',
    'lectern',
    'smithing_table',
    'smoker',
    'stonecutter_block'
]


function nonVanillaItems(){
    world.events.tick.subscribe((gameTick) => {
        
        for (const player of world.getPlayers()) {
            if (player.hasTag('staff')) continue
            const inv = player.getComponent('minecraft:inventory').container
            for(let i = 0; i < inv.size; i++) {
                let pX = Math.round(player.location.x*100)*0.01
                let pY = Math.round(player.location.y*100)*0.01
                let pZ = Math.round(player.location.z*100)*0.01
                let pCoords = `§f${pX} §7${pY}§f ${pZ}§r`
                const item = inv.getItem(i)
                if (!item) continue
                const execute = () => {
                    inv.setItem(i,voidSlot)
                    player.runCommand(`scoreboard players add @s IH 1`)
                    player.runCommand(`tellraw @a {"rawtext":[{"text":" [§5§lKCraft Security§r] - Suspect: '§a${player.nameTag}§r'  Location [${pCoords}]  Cleared (§c${item.amount}  ${itemID}§r)${lore}."}]}`)
                }
                let itemID = item.id.replace('minecraft:','')
                const lore = item.getLore()
                if (xItems.includes(itemID) || item.amount > 64 || lore.length > 0 || (item.amount > 1 && (itemID === 'dragon_egg'|| itemID === 'enchanted_golden_apple'))) execute()
                else continue
            }
        }
    })
    world.events.beforeItemUseOn.subscribe((touch) =>{
        let source = touch.source
        if (source.hasTag('staff')) return
        let pX = Math.round(source.location.x*100)*0.01
        let pY = Math.round(source.location.y*100)*0.01
        let pZ = Math.round(source.location.z*100)*0.01
        let pCoords = `§f${pX} §7${pY}§f ${pZ}§r`
        let blockLocation = touch.blockLocation
        let item = touch.item
        let contents = ''
        let itemID = item.id.replace('minecraft:','')
        let block = source.dimension.getBlock(blockLocation)
        let blockID = block.id.replace('minecraft:','')
        let blockCoords = `§f${blockLocation.x} §7${blockLocation.y} §f${blockLocation.z}§r`
        if (blockID === 'chest'){
            const bInv = block.getComponent('inventory').container
            for(let i = 0; i < bInv.size; i++) {
                const item = bInv.getItem(i)
                if (!item) continue
                const lore = item.getLore()
                let itemID = item.id.replace('minecraft:','')
                if (xItems.includes(itemID) || lore.length > 0) {
                    contents += ` <${item.amount}-${item.nameTag}§r:${itemID} ${lore}> `
                    bInv.setItem(i,voidSlot)
                } else continue
            } if (contents !== ''){//@a down here for the server
                source.runCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"     [§5§lKCraft Security§r] - Suspect:'§a${source.nameTag}§r' Location:'${pCoords}'  filtered [§6${blockID}§r] at [§f${blockCoords}§r] which contained:\n          ${contents}"}]}`)
            }
        } if (source.hasTag(`01`)){
            if (itemID.endsWith(`_box`)){ 
                if (blockID === 'allow'||source.hasTag(`shop`)) return
                else touch.cancel = true
            } else if ((itemID === '' && publicBlock.includes(blockID))||(itemID === '' && source.dimension.getBlock(new BlockLocation(blockLocation.x,blockLocation.y-1,blockLocation.z)).id.includes('allow'))) return
            else touch.cancel = true
        }
    })
    //world.events.blockBreak.subscribe(({ block, brokenBlockPermutation, dimension, player }) => {  
    //    dimension.getBlock(block.location).setPermutation(brokenBlockPermutation.clone())
    //})
}
nonVanillaItems ()
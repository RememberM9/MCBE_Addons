import { world, MinecraftEnchantmentTypes, MinecraftItemTypes, ItemStack } from "mojang-minecraft"

const execute = () => {
    player.runCommand(`scoreboard players add @s IH 1`)
    inventory.setItem(i, new ItemStack(MinecraftItemTypes.air, 0, 0))
    player.runCommand(`tellraw @a {"rawtext":[{"text":"  §2[§5KCraft Security§r§2] - Cleared §r${item.amount} ${itemID}§2 from §a${player.name}§r§2\n        Item Name:§r'${item.nameTag}§r'§2; Secondary display:§r'${lore}§r'§2\n        Enchantments:§c[§r${data}§c]§r"}]}`)
}
function IllegalEnchantmentSet() {
    world.events.tick.subscribe((tick) => {
        for (const player of world.getPlayers()) {
            if (player.hasTag(`staff`)) continue
            const inventory = player.getComponent('minecraft:inventory').container
            for (let i = 0; i < inventory.size; i++) {
                const item = inventory.getItem(i)
                if (!item) continue
                const itemID = item.id.replace('minecraft:', '')
                const lore = item.getLore()
                let data = ''
                let preKeys = 0
                let firstKeys = 0
                let secondKeys = 0
                const Enchantments = item.getComponent('minecraft:enchantments').enchantments
                for (const enchantType of Object.keys(MinecraftEnchantmentTypes)) {
                    const enchantment = MinecraftEnchantmentTypes[enchantType]
                    if (!Enchantments.hasEnchantment(enchantment)) continue

                    const multiProtection = ['blastProtection', 'fireProtection', 'projectileProtection', 'protection']
                    const mendfinity = ['infinity', 'mending']
                    const damagePlus = ['baneOfArthropods', 'sharpness', 'smite']
                    const toolPlus = ['fortune', 'silkTouch']
                    const multipierce = ['multishot', 'piercing']
                    const tridentPlus1 = ['riptide', 'channeling']
                    const tridentPlus2 = ['riptide', 'loyalty']

                    const enchantData = Enchantments.getEnchantment(enchantment)
                    data += ` (§7${enchantData.type.id} ${enchantData.level}§r) `
                    if (enchantData.level > enchantData.type.maxLevel) {
                        preKeys += 1
                    } else if (itemID === 'enchanted_book') {
                        continue
                    } else if (itemID.slice(-7) === '_helmet') {
                        const nonHelmetEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'fortune', 'silkTouch', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed']
                        if (nonHelmetEnch.includes(enchantType)) {
                            preKeys += 1
                        } else if (multiProtection.includes(enchantType)) {
                            firstKeys += 1
                        } else continue
                    } else if (itemID.slice(-11) === '_chestplate') {
                        const nonChestEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed']
                        if (nonChestEnch.includes(enchantType)) {
                            preKeys += 1
                        } else if (multiProtection.includes(enchantType)) {
                            firstKeys += 1
                        } else continue
                    } else if (itemID.slice(-9) === '_leggings') {
                        const nonPantsEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed']
                        if (nonPantsEnch.includes(enchantType)) {
                            preKeys += 1
                        } if (multiProtection.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID.slice(-6) === '_boots') {
                        const nonBootsEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak']
                        for (const nonBoots of nonBootsEnch) {
                            if (nonBoots.includes(enchantType)) {
                                preKeys += 1
                            } else continue
                        } if (multiProtection.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID === 'elytra') {
                        const nonElytraEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns']
                        for (const nonElytra of nonElytraEnch) {
                            if (enchantType.includes(nonElytra)) {
                                preKeys += 1
                            } else continue
                        }
                    } else if (itemID === 'bow') {
                        const nonBowEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonBow of nonBowEnch) {
                            if (enchantType.includes(nonBow)) {
                                preKeys += 1
                            }
                        } if (mendfinity.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID === 'shield' || itemID === 'flint_and_steel' || itemID === 'carrot_on_a_stick' || itemID === 'warped_fungus_on_a_stick') {
                        const nonUtiltyEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonUtilty of nonUtiltyEnch) {
                            if (enchantType.includes(nonUtilty)) {
                                preKeys += 1
                            } else continue
                        }
                    } else if (itemID.includes('sword')) {
                        const nonSwordEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonSword of nonSwordEnch) {
                            if (enchantType.includes(nonSword)) {
                                preKeys += 1
                            } else continue
                        } if (damagePlus.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID === 'wooden_axe' || itemID === 'stone_axe' || itemID === 'golden_axe' || itemID === 'iron_axe' || itemID === 'diamond_axe' || itemID === 'netherite_axe') {
                        const nonAxeEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonAxe of nonAxeEnch) {
                            if (enchantType.includes(nonAxe)) {
                                preKeys += 1
                            }
                        } if (toolPlus.includes(enchantType)) {
                            firstKeys += 1
                        } if (damagePlus.includes(enchantType)) {
                            secondKeys += 1
                        }
                    } else if (itemID === 'wooden_pickaxe' || itemID === 'wooden_shovel' || itemID === 'wooden_hoe' || itemID === 'stone_pickaxe' || itemID === 'stone_shovel' || itemID === 'stone_hoe' || itemID === 'golden_pickaxe' || itemID === 'golden_shovel' || itemID === 'golden_hoe' || itemID === 'iron_pickaxe' || itemID === 'iron_shovel' || itemID === 'iron_hoe' || itemID === 'diamond_pickaxe' || itemID === 'diamond_shovel' || itemID === 'diamond_hoe' || itemID === 'netherite_pickaxe' || itemID === 'netherite_shovel' || itemID === 'netherite_hoe') {
                        const nonToolEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonTool of nonToolEnch) {
                            if (enchantType.includes(nonTool)) {
                                preKeys += 1
                            } else continue
                        } if (toolPlus.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID === 'shears') {
                        const nonShearsEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'fortune', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonShears of nonShearsEnch) {
                            if (enchantType.includes(nonShears)) {
                                preKeys += 1
                            } else continue
                        }
                    } else if (itemID === 'fishing_rod') {
                        const nonFishingRodEnch = ['multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonFishingRod of nonFishingRodEnch) {
                            if (enchantType.includes(nonFishingRod)) {
                                preKeys += 1
                            } else continue
                        }
                    } else if (itemID === 'trident') {
                        const nonTridentEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonTrident of nonTridentEnch) {
                            if (enchantType.includes(nonTrident)) {
                                preKeys += 1
                            } else continue
                        } if (tridentPlus1.includes(enchantType)) {
                            firstKeys += 1
                        } if (tridentPlus2.includes(enchantType)) {
                            secondKeys += 1
                        }
                    } else if (itemID === 'crossbow') {
                        const nonCrossbowEnch = ['luckOfTheSea', 'lure', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding']
                        for (const nonCrossbow of nonCrossbowEnch) {
                            if (enchantType.includes(nonCrossbow)) {
                                preKeys += 1
                            } else continue
                        } if (multipierce.includes(enchantType)) {
                            firstKeys += 1
                        }
                    } else if (itemID === 'skull' || itemID === 'carved_pumpkin' || itemID === 'lit_pumpkin' || itemID === 'warped_fungus_on_a_stick') {
                        const nonSkullEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'mending', 'unbreaking']
                        for (const nonSkull of nonSkullEnch) {
                            if (enchantType.includes(nonSkull)) {
                                preKeys += 1
                            } else continue
                        }
                    } else if (itemID === 'compass' || itemID === 'lodestone_compass' || itemID === 'recovery_compass') {
                        const nonSkullEnch = ['luckOfTheSea', 'lure', 'multishot', 'piercing', 'quickCharge', 'flame', 'infinity', 'power', 'punch', 'channeling', 'impaling', 'loyalty', 'riptide', 'fireAspect', 'knockback', 'looting', 'baneOfArthropods', 'sharpness', 'smite', 'efficiency', 'fortune', 'silkTouch', 'aquaAffinity', 'respiration', 'swiftSneak', 'depthStrider', 'featherFalling', 'frostWalker', 'soulSpeed', 'blastProtection', 'fireProtection', 'projectileProtection', 'protection', 'thorns', 'binding', 'mending', 'unbreaking']
                        for (const nonSkull of nonSkullEnch) {
                            if (enchantType.includes(nonSkull)) {
                                preKeys += 1
                            } else continue
                        }
                    } else {
                        preKeys += 1
                    }
                } if (preKeys > 0 || firstKeys > 1 || secondKeys > 1) execute()
                else continue
            }
        }
    })
} IllegalEnchantmentSet()

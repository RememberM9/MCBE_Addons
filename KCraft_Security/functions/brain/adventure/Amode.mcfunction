tag @s[tag=!"01",scores={Amode=20..}] add "01"
scoreboard players remove @s Amode 1
scoreboard players set @s[tag=adv,scores={Amode=!20..50}] Amode 50
execute @s[scores={Amode=49},m=!a] ~ ~ ~ gamerule sendcommandfeedback false
gamemode a @s[scores={Amode=48},m=!a]
execute @s[scores={Amode=47}] ~ ~ ~ gamerule sendcommandfeedback true
tag @s[tag=adv,scores={Amode=20}] remove adv
titleraw @s[tag=adv] actionbar {"rawtext": [{"text":"§7§6Adventure"}]}
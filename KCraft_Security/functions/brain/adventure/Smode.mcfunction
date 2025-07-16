scoreboard players remove @s Amode 1
tag @s[tag=adv2,scores={Amode=5}] remove adv2
execute @s[scores={Amode=4}] ~ ~ ~ gamerule sendcommandfeedback false
gamemode s @s[scores={Amode=3}]
execute @s[scores={Amode=2}] ~ ~ ~ gamerule sendcommandfeedback true
tag @s[tag="01",tag=!adv2,scores={Amode=1}] remove "01"
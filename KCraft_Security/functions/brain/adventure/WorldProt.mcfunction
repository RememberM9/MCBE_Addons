tag @a[tag=!adv,tag="IH"] add adv
execute @r[tag=adv] ~ ~ ~ scoreboard objectives add Amode dummy Adventure
scoreboard players random @r[tag=adv,tag=!adv2] Amode 12 19
tag @r[tag=adv,tag=!adv2] add adv2
execute @a[scores={Amode=11..50}] ~ ~ ~ function brain/adventure/Amode
execute @a[scores={Amode=1..10},tag=!"§l§4ItemHack§r",tag=!"§l§4S_U_S§r"] ~ ~ ~ function brain/adventure/Smode
scoreboard players reset @r[m=s,tag=!staff,scores={Amode=0}] Amode
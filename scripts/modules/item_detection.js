import {
  ItemStack,
  Items,
  world,
  MinecraftEnchantmentTypes,
} from "mojang-minecraft";

const banned_items = [
  "minecraft:portal",
  "minecraft:item.soul_campfire",
  "minecraft:fire",
  "minecraft:item.chain",
  "minecraft:item.warped_door",
  "minecraft:item.crimson_door",
  "minecraft:item.campfire",
  "minecraft:item.kelp",
  "minecraft:bee_nest",
  "minecraft:beehive",
  "minecraft:item.wooden_door",
  "minecraft:item.iron_door",
  "minecraft:item.cake",
  "minecraft:item.reeds",
  "minecraft:item.camera",
  "minecraft:item.frame",
  "minecraft:pistonarmcollision",
  "minecraft:movingBlock",
  "minecraft:item.cake",
  "minecraft:item.flower_pot",
  "minecraft:info_update2",
  "minecraft:stickyPistonArmCollision",
  "minecraft:movingblock",
  "minecraft:invisiblebedrock",
  "minecraft:glowingobsidian",
  "minecraft:flowing_water",
  "minecraft:flowing_lava",
  "minecraft:item.nether_sprouts",
];

const allEnchantments = Object.values(MinecraftEnchantmentTypes);

export function ItemChecker() {
  world.events.tick.subscribe(() => {
    for (const player of world.getPlayers()) {
      let inventory = player.getComponent("minecraft:inventory").container;
      for (let i = 0; i < inventory.size; i++) {
        let item = inventory.getItem(i);
        if (banned_items.includes(item.id)) {
          inventory.setItem(i, new ItemStack(Items.get("minecraft:air"), 0, 0));
        }
        const itemEnchantments = item.getComponent("enchantments").enchantments;
        for (let ench of allEnchantments) {
          let enchLvl = itemEnchantments.hasEnchantment(ench);
          if (enchLvl > ench.maxLevel) {
            itemEnchantments.removeEnchantment(ench);
          }
        }
      }
    }
  });
}

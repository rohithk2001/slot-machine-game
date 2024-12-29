export const rewards = [
    { type: "Weapon", rarity: "Common", countRange: [1, 5] },
    { type: "Weapon", rarity: "Rare", countRange: [1, 3] },
    { type: "Weapon", rarity: "Epic", countRange: [1, 2] },
    { type: "Consumable", rarity: "Common", countRange: [2, 6] },
    { type: "Consumable", rarity: "Rare", countRange: [1, 4] },
    { type: "Material", rarity: "Common", countRange: [3, 7] },
    { type: "Material", rarity: "Epic", countRange: [1, 3] },
  ];
  
  // Generate a random reward
  export const getRandomReward = () => {
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    const count = Math.floor(
      Math.random() * (reward.countRange[1] - reward.countRange[0] + 1)
    ) + reward.countRange[0];
    return { ...reward, count };
  };
  
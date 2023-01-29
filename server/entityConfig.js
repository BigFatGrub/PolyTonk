exports.entityTypes = [{
  name: "Unknown Class",
  bodyShape: 8,
  barrels: [],
}, {
  name: "Coin",
  bodyShape: 15,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Square",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Coin",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Triangle",
  bodyShape: 6,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Pentagon",
  bodyShape: 7,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Hexagon",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Bullet",
  bodyShape: 3,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Drone",
  bodyShape: 6,
  fieldFactor: 1,
  barrels: []
}, {
  name: "Tank",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Flank Guard",
  bodyShape: 6,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 180, offset: 0, height: 1.5, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Triple Shot",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 20, offset: 0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: -20, offset: -0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 0, offset: 0, height: 1.9, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Quad Tank",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 90, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 180, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 270, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Sniper",
  bodyShape: 5,
  fieldFactor: 1.2,
  barrels: [{ angle: 0, offset: 0, height: 2.2, width: 0.9, recoil: 1, delay: 0, reload: 1.25, bullet: { damageFactor: 1.1, rangeFactor: 1.1, penFactor: 1.1, spdFactor: 1.5, sprFactor: 0.4 }, }],
}, {
  name: "Twin",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, { angle: 0, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }],
}, {
  name: "Assassin",
  bodyShape: 5,
  fieldFactor: 1.3,
  barrels: [{ angle: 0, offset: 0, height: 2.5, width: 0.9, recoil: 1, delay: 0, reload: 1.4, bullet: { damageFactor: 1.2, rangeFactor: 1.2, penFactor: 1.2, spdFactor: 1.75, sprFactor: 0.3 }, }],
}, {
  name: "Ranger",
  bodyShape: 5,
  fieldFactor: 1.4,
  barrels: [{ angle: 0, offset: 0, height: 2.5, width: 0.9, recoil: 1, delay: 0, reload: 1.7, bullet: { damageFactor: 1.3, rangeFactor: 1.3, penFactor: 1.5, spdFactor: 2, sprFactor: 0.2 }, }, { canShoot: false, angle: 0, offset: 0, height: 1.3, width: 0.9, trapezoidWidth: -0.3 }],
}, {
  name: "Arty",
  spdFactor: 1,
  bodyShape: 5,
  fieldFactor: 1.3,
      shell: {
      shape: 8,
      spinning: false,
      spinSpeed: .5,
      color: 8,
      size: 1.5,
  },
barrels: [{ angle: 0, offset: 0, height: 3, width: 0.9, recoil: 7, delay: 0, reload: 7, bullet: { damageFactor: 1.4, rangeFactor: 5, penFactor: 7, spdFactor: 1.5, }, }],
}, { 
    name: "Railgun",
  spdFactor: 1.1,
  bodyShape: 5,
  fieldFactor: 1.5,
        shell: {
      shape: 8,
      spinning: false,
      spinSpeed: 10,
      color: 8,
      size: 1.5,
    },
barrels: [{ angle: 0, offset: 0, height: 2.7, width: 0.9, recoil: 10, delay: 0, reload: 5, bullet: { damageFactor: 1.6, rangeFactor: 2, penFactor: 10, spdFactor: 2.3, sprFactor: 0.2 }, }, { canShoot: false, angle: 0, offset: 0, height: 1.3, width: 0.9, trapezoidWidth: -0.3 }],
}, {
  name: "Annihilator",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.9, width: 1.9, recoil: 10, delay: 0, reload: 8, bullet: { damageFactor: 2, rangeFactor: 2, penFactor: 2, spdFactor: 0.5, }, }],
}, {
  name: "Destroyer",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.9, width: 1.5, recoil: 7.5, delay: 0, reload: 4, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 40, spdFactor: 0.7, }, }],
}, {
  name: "Machine Gun",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 0.5, delay: 0, reload: 0.5, trapezoidWidth: 0.15, bullet: { damageFactor: 0.97, rangeFactor: 1, penFactor: 0.97, spdFactor: 1.05, sprFactor: 4 }, }],
}, {
  name: "Negev",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 1.3, recoil: 3, delay: 0, reload: 1.5, trapezoidWidth: 0.15, bullet: { damageFactor: 0.97, rangeFactor: 1.25, penFactor: 0.97, spdFactor: 1.05, sprFactor: 2 }, }],
}, {
  
  name: "Tri-Angle",
  bodyShape: 0,
  fieldFactor: 1,
  spdFactor: 1.25,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
            { angle: 210, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }, 
            { angle: 150, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }],
}, {
  name: "Dominator",
  bodyShape: 0,
  fieldFactor: 2,
  spdFactor: 0,
  sizeFactor: 3,
  hltFactor: 16,
  canMove: false,
  shell: {
    shape: 6,
    spinning: false,
    spinSpeed: 0,
    color: 8,
    size: 1.25,
  },
  barrels: [{ angle: 0, offset: 0, height: 1.6, width: 0.8, recoil: 1, delay: 0, reload: 6, bullet: { damageFactor: 10, rangeFactor: 1, penFactor: 100, spdFactor: 0.8, sprFactor: 0.5 }, }, { canShoot: false, angle: 0, offset: 0, height: 1.2, width: 0.8, trapezoidWidth: -0.45 }],
}, {
  name: "Predadom",
  bodyShape: 0,
  fieldFactor: 2,
  spdFactor: 0,
  sizeFactor: 3,
  hltFactor: 16,
  canMove: false,
  shell: {
    shape: 6,
    spinning: false,
    spinSpeed: 0,
    color: 8,
    size: 1.25,
  },
  barrels: [
  { angle: 0, offset: 0, height: 2.6, width: 0.9, recoil: 1, delay: 4, reload: 6, bullet: { damageFactor: 10, rangeFactor: 1, penFactor: 100, spdFactor: 0.8, sprFactor: 0.5 }, }, 
  { angle: 0, offset: 0, height: 2.3, width: 1.2, recoil: 1, delay: 2, reload: 6, bullet: { damageFactor: 10, rangeFactor: 1, penFactor: 100, spdFactor: 0.8, sprFactor: 0.5 }, }, 
  { angle: 0, offset: 0, height: 2, width: 1.5, recoil: 1, delay: 0, reload: 6, bullet: { damageFactor: 10, rangeFactor: 1, penFactor: 100, spdFactor: 0.8, sprFactor: 0.5 }, }, 
  { canShoot: false, angle: 0, offset: 0, height: 1.1, width: 1.5, trapezoidWidth: -0.2 }],
}, {
  name: "Arena Closer",
  bodyShape: 0,
  fieldFactor: 15,
  barrels: [{ angle: 0, offset: 0, height: 1.5, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 100, rangeFactor: 0.8, penFactor: 900, spdFactor: 2.5, sprFactor: 0.5, }, }],
}, {
  name: "Smasher",
  bodyShape: 6,
  fieldFactor: 1.25,
  spdFactor: 1.25,
  hltFactor: 2,
  shell: {
    shape: 6,
    spinning: true,
    spinSpeed: 2,
    color: 8,
    size: 1.25,
  },
  barrels: [],
  //barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 0.25, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 180, offset: 0, height: 1.7, width: 1, recoil: 3, delay: 0, reload: 0.75, trapezoidWidth: -0.1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Mega Smasher",
  bodyShape: 6,
  fieldFactor: 1.25,
  spdFactor: 1,
  hltFactor: 2,
  shell: {
    shape: 6,
    spinning: true,
    spinSpeed: 1.5,
    color: 8,
    size: 1.4,
  },
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 5, delay: 0, reload: 3, bullet: { damageFactor: 5, rangeFactor: 1, penFactor: 1, spdFactor: .7, }, }],
  //barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 0.25, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, { angle: 180, offset: 0, height: 1.7, width: 1, recoil: 3, delay: 0, reload: 0.75, trapezoidWidth: -0.1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Fighter",
  bodyShape: 0,
  fieldFactor: 1,
  spdFactor: 1.25,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 0, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
            { angle: 210, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0.5, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }, 
            { angle: 150, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0.5, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, },
            { angle: 90, offset: 0, height: 1.5, width: 0.9, recoil: 0, delay: 0, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, },
            { angle: 180 + 90, offset: 0, height: 1.5, width: 0.9, recoil: 0, delay: 0, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }],
}, {
  name: "Octo Tank",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: (function(output = []){
    for (let i = 0; i < 8; i++) {
      output.push({ angle: i * (360 / 8), offset: 0, height: 1.8, width: 0.9, recoil: 1, delay: (i % 2) / 2, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, })
    };
    return output;
  })()
}, {
  name: "Penta Shot",
  bodyShape: 6,
  fieldFactor: 1,
  barrels: [{ angle: -40, offset: -0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: .5, spdFactor: 1, }, }, { angle: 40, offset: 0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: .5, spdFactor: 1, }, }, { angle: 20, offset: 0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: .5, spdFactor: 1, }, }, { angle: -20, offset: -0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: .5, spdFactor: 1, }, }, { angle: 0, offset: 0, height: 1.9, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: .5, spdFactor: 1, }, }],
}, {
  name: "Booster",
  bodyShape: 5,
  fieldFactor: 1,
  spdFactor: 1.25,
  barrels: [{ angle: 0, offset: 0, height: 1.8, width: 0.9, recoil: 0, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
    { angle: 140, offset: -0.1, height: 1.35, width: 0.9, recoil: 1.75, delay: 0.9, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, },
    { angle: 220, offset: 0.1, height: 1.35, width: 0.9, recoil: 1.75, delay: 0.9, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, },
    { angle: 210, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0.5, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }, 
    { angle: 150, offset: 0, height: 1.5, width: 0.9, recoil: 1.75, delay: 0.5, reload: 1, bullet: { damageFactor: 0.5, rangeFactor: 0.75, penFactor: 0.7, spdFactor: 1, }, }],
}, {
  name: "Hybrid",
  bodyShape: 6,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 1.9, width: 1.5, recoil: 7.5, delay: 0, reload: 4, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 2, spdFactor: 0.97, }, }, { angle: 180, offset: 0, height: 1.4, width: 0.9, recoil: 7.5, delay: 0, reload: 4, trapezoidWidth: 0.25, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 2, spdFactor: 0.7, type: "Drone" }, }],
}, {
  name: "Overseer",
  bodyShape: 6,
  fieldFactor: 1.2,
  barrels: [{ angle: 270, offset: 0, height: 1.4, width: 0.9, recoil: 7.5, delay: 0, reload: 4, trapezoidWidth: 0.25, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 2, spdFactor: 0.97, type: "Drone" }, }, { angle: 90, offset: 0, height: 1.4, width: 0.9, recoil: 7.5, delay: 0, reload: 4, trapezoidWidth: 0.25, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 2, spdFactor: 0.97, type: "Drone" }, }],
}, {
  name: "Overlord",
  bodyShape: 6,
  fieldFactor: 1.2,
  barrels: (function(output=[]){
    for (let i = 0; i < 4; i++) {
      output.push({ angle: i * 90, offset: 0, height: 1.4, width: 0.9, recoil: 7.5, delay: 0, reload: 4, trapezoidWidth: 0.25, bullet: { damageFactor: 10, rangeFactor: 2, penFactor: 2, spdFactor: 0.97, type: "Drone" }, })
    };
    return output;
  })(),
}, {
  name: "Flank Penta Shot",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: -40, offset: -0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 40, offset: 0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 20, offset: 0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: -20, offset: -0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 0, offset: 0, height: 1.9, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, },
      //
      { angle: -40 + 180, offset: -0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 40 + 180, offset: 0.2, height: 1.4, width: 0.9, recoil: 1, delay: 1, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 20 + 180, offset: 0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: -20 + 180, offset: -0.15, height: 1.7, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
      { angle: 0 + 180, offset: 0, height: 1.9, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
    name: "Shotty",
  bodyShape: 5,
  fieldFactor: 1.05,
  barrels: [{ angle: 0, offset: 0.5, height: 2, width: 0.9, recoil: 1.5, delay: 0, reload: 5, bullet: { damageFactor: 2, rangeFactor: 1.5, penFactor: 2, spdFactor: .8, sprFactor: 4,}, }, { angle: 0, offset: -0.5, height: 2, width: 0.9, recoil: 1.5, delay: .0, reload: 5, bullet: { damageFactor: 2, rangeFactor: 1, penFactor: 3, spdFactor: .8, sprFactor: 4,}, }, { angle: 0, offset: 0.5, height: 2, width: 0.9, recoil: 1.5, delay: .0, reload: 5, bullet: { damageFactor: 2, rangeFactor: 1.5, penFactor: 2, spdFactor: .8, sprFactor: 4,}, }, { angle: 0, offset: 0.5, height: 2, width: 0.9, recoil: 1.5, delay: 0, reload: 5, bullet: { damageFactor: 2, rangeFactor: 1.5, penFactor: 2, spdFactor: .8, sprFactor: 4,}, }],
}, {
  name: "Twin Flank",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, 
    { angle: 0, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, },
    { angle: 180, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, 
    { angle: 180, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }],
}, {
  name: "Triple Twin",
  bodyShape: 8,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, 
    { angle: 0, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, },
    { angle: 120, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, 
    { angle: 120, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, },
    { angle: 240, offset: 0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, }, 
    { angle: 240, offset: -0.5, height: 1.8, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 0.97, spdFactor: 1, }, },],
}, {
  name: "Auto Turret",
  bodyShape: 0,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0, height: 2, width: 1, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 1, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}, {
  name: "Triplet",
  bodyShape: 5,
  fieldFactor: 1,
  barrels: [{ angle: 0, offset: 0.5, height: 1.5, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }, 
            { angle: 0, offset: -0.5, height: 1.5, width: 0.9, recoil: 1, delay: 0.5, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, },
            { angle: 0, offset: 0, height: 1.8, width: 1, recoil: 1, delay: 0, reload: 1, bullet: { damageFactor: 0.8, rangeFactor: 1, penFactor: 1, spdFactor: 1, }, }],
}];
exports.stringEntityTypes = {};
exports.upgradeTree = {
  Tank: {
    tier1: ["Twin", "Sniper", "Machine Gun", "Flank Guard", "Overseer"],//, "Mothership", "Dominator", "Arena Closer"],
    tier2: ["Smasher"]
  },
  Smasher: {
    tier3: ["Mega Smasher"],
  },
  Sniper: {
    tier2: ["Assassin", "Arty"],
  },
  Overseer: {
    tier3: ["Overlord"],
  },
  "Flank Guard": {
    tier2: ["Quad Tank", "Triple Shot", "Tri-Angle", "Twin Flank"],
  },
  "Tri-Angle": {
    tier3: ["Booster", "Fighter"],
  },
  Twin: {
    tier2: ["Quad Tank", "Triple Shot", "Twin Flank", "Shotty"],
    tier3: ["Triplet"],
  },
  "Twin Flank": {
    tier3: ["Triple Twin"]
  },
  "Triple Shot": {
    tier3: ["Penta Shot"]
  },
  "Quad Tank": {
    tier3: ["Octo Tank"]
  },
  Assassin: {
    tier3: ["Ranger"],
  },
  Arty: {
    tier3: ["Railgun"],
  },
  "Machine Gun": {
    tier2: ["Destroyer"],
    tier3: ["Negev"],
  },
  Destroyer: {
    tier3: ["Annihilator"],
  },
};
exports.entityTypeMockups = [];
// EntityTypes Helper
for (let key in exports.entityTypes) {
  exports.stringEntityTypes[exports.entityTypes[key].name] = key;
};
for (let key in exports.entityTypes) {
  if (!(exports.entityTypes[key].name in exports.upgradeTree)) {
    exports.upgradeTree[exports.entityTypes[key].name] = {tier1:[],tier2:[],tier3:[]};
  } else {
    if (exports.upgradeTree[exports.entityTypes[key].name].tier1 == undefined) exports.upgradeTree[exports.entityTypes[key].name].tier1 = [];
    if (exports.upgradeTree[exports.entityTypes[key].name].tier2 == undefined) exports.upgradeTree[exports.entityTypes[key].name].tier2 = [];
    if (exports.upgradeTree[exports.entityTypes[key].name].tier3 == undefined) exports.upgradeTree[exports.entityTypes[key].name].tier3 = [];
  };
  exports.entityTypes[key].id = key;
  try {
    for (let i = 0; i < exports.entityTypes[key].barrels.length; i++) {
      exports.entityTypes[key].barrels[i].angle = exports.entityTypes[key].barrels[i].angle * Math.PI / 180;
      if (exports.entityTypes[key].barrels[i].canShoot == undefined) exports.entityTypes[key].barrels[i].canShoot = true;
    }
  } catch (e) {}
  let entityMockup = {};
  entityMockup.name = exports.entityTypes[key].name;
  if (entityMockup.name.startsWith("UC")) {
    entityMockup.name = "Unnamed Class"  
  };
  entityMockup.bodyShape = exports.entityTypes[key].bodyShape;
  entityMockup.barrels = [];
  entityMockup.turrets = exports.entityTypes[key].turrets || [];
  entityMockup.turretsLength = entityMockup.turrets.length;
  for (let i = 0; i < entityMockup.turrets.length; i++) {
    entityMockup.turrets[i].tank = exports.stringEntityTypes[entityMockup.turrets[i].tank];
  };
  if (exports.entityTypes[key].shell != undefined) entityMockup.shell = exports.entityTypes[key].shell;
  for (let key2 in exports.entityTypes[key].barrels) {
    let barrel = exports.entityTypes[key].barrels[key2];
    entityMockup.barrels.push({
      width: barrel.width,
      height: barrel.height,
      angle: barrel.angle,
      offset: barrel.offset,
      trapezoidWidth: barrel.trapezoidWidth || 0,
    });
  };
  entityMockup.barrelsLength = entityMockup.barrels.length;
  exports.entityTypeMockups.push(entityMockup);
};
for (let key in exports.upgradeTree) {
  for (let key2 in exports.upgradeTree[key]) {
    for (let key3 in exports.upgradeTree[key][key2]) {
      exports.upgradeTree[key][key2][key3] = parseInt(exports.stringEntityTypes[exports.upgradeTree[key][key2][key3]]);
    };
  };
};
function convertDiepToKanono(tank) {
  for (let i = 0; i < tank.barrels.length; i++) {
    tank.barrels[i].height  = tank.barrels[i].size;
    delete tank.barrels[i].size;
    tank.barrels[i].height /= 50;
    tank.barrels[i].width /= 50;
    tank.barrels[i].offset /= 50;
  }
  return tank;
}

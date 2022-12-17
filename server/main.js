const config = require("./config.json");
config.port = process.env.PORT || config.port;
for (let key in config) {
    if (process.env[key] != null) config[key] = process.env[key];
};
const entityConfig = require("./entityConfig.js");
const util = require("util");
const botNames = require("./botNames.js");
const protocol = require("./protocol/protocol.js");
const Quadtree = require("./lib/quadtree.js");
const WebSocket = require('ws');
const http = require('http');
let ipBans = config.ipBanDatabaseEnabled ? require("./db/ipbans.json") : [];
let accounts = config.accountsEnabled ? require("./db/accounts.json") : {};
let latestAccountID = Object.keys(accounts).length;
const crypto = require("crypto");
const fs = require("fs");
function writeAccountDB() {
    if (!config.accountsEnabled) return;
    writeQueue.push(function(){
        fs.writeFile("./db/accounts.json", JSON.stringify(accounts), function writeJSON(err) {
            if (err) return console.log(err);
        });
    });
};
function createAccount(name, password) {
    if (!config.accountsEnabled) return;
    for (let key in accounts) {
        if (name == accounts[key].name) {
            return 0; // name already taken
        };
    };
    let randomTank = [entityConfig.stringEntityTypes["Tank"], entityConfig.stringEntityTypes["Twin"], entityConfig.stringEntityTypes["Triplet"], entityConfig.stringEntityTypes["Destroyer"], entityConfig.stringEntityTypes["Annihilator"]];
    randomTank = randomTank[Math.floor(Math.random() * randomTank.length)];
    let randomColor = [10, 9, 6, 11][Math.floor(Math.random() * 4)];
    accounts[latestAccountID + 1] = {
        "name": name,
        "password": crypto.createHash("sha256").update(password).digest("hex"),
        "terminalAccessLevel": 0,
        "color": randomColor,
        "score": 0,
        "level": 0,
        "creationDate": Date.now(),
        "tank": randomTank,
        "kills": 0,
        "deaths": 0,
    };
    latestAccountID++;
    return 1;
};
function checkAccount(name, password) {
    if (!config.accountsEnabled) return false;
    for (let key in accounts) {
        if (name == accounts[key].name && crypto.createHash("sha256").update(password).digest("hex") == accounts[key].password) {
            return [true, key];
        };
    };
    return false;
};
var express = require('express');
const {
    clearInterval
} = require("timers");
var app = express();
var expressWs = require('express-ws')(app);

if (config.hostClient) app.use(express.static('client'));
app.get('/', function(req, res, next) {
    console.log('get route', req.testing);
    res.end();
});
app.listen(config.port);
const {
    create
} = require("domain");
const prefix = "---===>>> ";
const server = {
    entityTypesPacket: 0,
    fps: 30,
    level50Score: 30000,
};
util.lerp = function(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
};

util.rectCollide = (rect1, rect2) => {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
    }
    return false;
};
util.distance = function(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
};
// thank you ABC!!!
util.getFOV = (size) => 1.75 * (Math.sqrt(size) / 7.5);
util.getSize = function(a) {
    return 50 + ((a * a) / 100) / (a < 0 ? -1 : 1)
};
util.getScoreFromLevel = function(a) {
    return ((a - 1) * (a - 1)) * 11;
};
util.getLevelFromScore = function(a) {
    return Math.floor(Math.sqrt(a / 11) + 1);
};
util.getSpeedFromLevel = function(a) {
    return (15 - ((a - 1) / (a / 7.5))) * 1.5;
};
util.getRandomFromRange = function(a0, a1) {
    return a0 + (Math.random() * (a1 - a0));
};
util.getBasePos = function(a, b) {
    let baseSize = room.width / room.baseSize;
    switch (room.teamBaseMode) {
        case 0: { // 2 TDM
            switch (b) {
                case 0: { // Orange, down left corner
                    if (a == 0) {
                        return util.lerp(-(room.width / 2) + (baseSize / 2), -(room.width / 2) + (baseSize / 2) + baseSize, 0.5);
                    } else return util.lerp(room.height / 2 - baseSize - (baseSize / 2), room.height / 2 - baseSize - (baseSize / 2) + baseSize, 0.5);
                }
                break;
            case 1: { // Red, up right corner
                if (a == 0) {
                    return util.lerp((room.width / 2 - baseSize) - (baseSize / 2), (room.width / 2 - baseSize) - (baseSize / 2) + baseSize, 0.5);
                } else return util.lerp(-(room.height / 2) + (baseSize / 2), -(room.height / 2) + (baseSize / 2) + baseSize, 0.5);
            }
            break;
            };
        }
        break;
    case 1: {
        switch (b) {
            case 0: { // Orange, down left corner
                if (a == 0) {
                    return util.lerp(-(room.width / 2) + (baseSize / 2), -(room.width / 2) + (baseSize / 2) + baseSize, 0.5); // left
                } else return util.lerp(room.height / 2 - baseSize - (baseSize / 2), room.height / 2 - baseSize - (baseSize / 2) + baseSize, 0.5); // bottom
            }
            break;
        case 1: { // Red, up right corner
            if (a == 0) {
                return util.lerp((room.width / 2 - baseSize) - (baseSize / 2), (room.width / 2 - baseSize) - (baseSize / 2) + baseSize, 0.5); // right
            } else return util.lerp(-(room.height / 2) + (baseSize / 2), -(room.height / 2) + (baseSize / 2) + baseSize, 0.5); // top
        }
        break;
        case 2: { // Green, down right corner
            if (a == 0) {
                return util.lerp(-(room.width / 2) + (baseSize / 2), -(room.width / 2) + (baseSize / 2) + baseSize, 0.5); // left
            } else return util.lerp(-(room.height / 2) + (baseSize / 2), -(room.height / 2) + (baseSize / 2) + baseSize, 0.5); // top
        }
        break;
        case 3: { // Blue, down right corner
            if (a == 0) {
                return util.lerp((room.width / 2 - baseSize) - (baseSize / 2), (room.width / 2 - baseSize) - (baseSize / 2) + baseSize, 0.5); // right
            } else return util.lerp(room.height / 2 - baseSize - (baseSize / 2), room.height / 2 - baseSize - (baseSize / 2) + baseSize, 0.5); // bottom
        }
        break;
        };
    }
    break;
    };
};
util.getHealthFromLevel = function(a) {
    return 10 + (a * 1.25);
};
util.lerpAngle = function(a, b, x) {
    var normal = {
        x: Math.cos(a),
        y: Math.sin(a)
    };
    var normal2 = {
        x: Math.cos(b),
        y: Math.sin(b)
    };
    var res = {
        x: util.lerp(normal.x, normal2.x, x),
        y: util.lerp(normal.y, normal2.y, x)
    };
    return Math.atan2(res.y, res.x);
};

server.entityTypesPacket = protocol.encode("entityTypes", JSON.stringify(entityConfig.entityTypeMockups));
//New server needs to start here. How about const room2 = {}
const room = {
    width: config.width,
    height: config.height,
    dominationColors: [12, 12, 12, 12],
    entities: {},
    clients: {},
    closing: false,
    tree: new Quadtree({
        x: -config.width / 2,
        y: -config.height / 2,
        width: config.width,
        height: config.height
    }, 4),
    treeRefresh: function() {
        room.tree = new Quadtree({
            x: -room.width / 2 - config.mapBorderSize,
            y: -room.height / 2 - config.mapBorderSize,
            width: room.width + config.mapBorderSize,
            height: room.height + config.mapBorderSize
        }, 4);
    },
    shapeAmount: 0,
    maxShapes: config.maxShapesDependsOnMapSize ? (config.width + config.height) / 250 : config.maxShapes,
    gm: config.gm,
    teams: (function() {
        if (config.gm == "2tdm") return 2;
        if (config.gm == "2dom") return 2;
        if (config.gm == "4tdm") return 4;
        if (config.gm == "2dom") return 2;
        return false;
    })(),
    teamBaseMode: (function() {
        if (config.gm == "2tdm") return 0;
        if (config.gm == "2dom") return 0;
        if (config.gm == "4tdm") return 1;
        if (config.gm == "2dom") return 2;
        return -1;
    })(),
    ffa: (function() {
        if (config.gm == "ffa" || config.gm == "sand") return true;
        return false;
    })(),
    baseSize: 0,
    lb: [],
    restart: function() {
        room.treeRefresh();
        room.entities = {};
        for (let key in room.clients) {
            room.clients[key].close();
        };
    },
    peopleCanUpgrade: true,
    statMode: 0,
};
switch (room.gm) {
    case "sand": {
        config.publicCheatingLevel = 1;
    } break;
};
room.baseSize = (function() {
    switch (room.teamBaseMode) {
        case -1:
            return 0;
            break;
        case 0:
            return 12;
            break;
        case 1:
            return 12;
            break;
        case 2:
            return 12;
            break;
    }
})();

class IDGenerator {
    constructor() {
        this.id = 0;
    }
    generateId() {
        return this.id++;
    }
};

class Barrel {
    constructor(owner, reload = 1, delay, width, height, angle, offset, recoil, damageFactor = 1, rangeFactor = 1, penFactor = 1, spdFactor = 1, sprFactor = 1,
        canShoot) {
        this.owner = owner;
        this.reload = reload;
        this.delay = delay;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.offset = offset;
        this.recoil = recoil;
        this.damageFactor = damageFactor;
        this.rangeFactor = rangeFactor;
        this.penFactor = penFactor;
        this.spdFactor = spdFactor;
        this.canShoot = canShoot;
        this.barrelAnimation = 0;
        this.sprFactor = sprFactor;
        this.barrelAnimationResetTime = Date.now();
        this.reloadTime = 0;
        this.delayTime = 0;
        this.coolingDown = false;
        this.previousFrame = {
            shooting: false,
            skill: {
                rld: 0,
            },
        };
    }
    shoot() {
        if ((this.reloadTime + this.delayTime) != 0) {
            return;
        };
        this.barrelAnimationResetTime = Date.now() + (3000 / server.fps);
        this.barrelAnimation = 1;
        let entity = room.entities[this.owner];
        entity.vx -= Math.cos(entity.facing + this.angle) * (this.recoil * 2.5);
        entity.vy -= Math.sin(entity.facing + this.angle) * (this.recoil * 2.5);
        this.reloadTime = this.reload * (server.fps / 2) / Math.sqrt(Math.sqrt(room.entities[this.owner].skill.rld + 1));
        let x = (entity.x + Math.cos(entity.facing + this.angle) * entity.size * this.height) + Math.cos(entity.facing + this.angle + this.offset) * entity
            .size;
        let y = (entity.y + Math.sin(entity.facing + this.angle) * entity.size * this.height) + Math.sin(entity.facing + this.angle + this.offset) * entity
            .size;
        let bullet = new Entity(x, y, "", idGenerator.generateId(), entity.size * this.width / 2, "bullet");
        bullet.define("Bullet");
        bullet.shooting = true;
        bullet.showName = false;
        bullet.showHealth = false;
        let spraySize = (((Math.random() * 2) - 1) / 10) * this.sprFactor;
        bullet.vx = (Math.cos(entity.facing + this.angle + spraySize) * (20 + room.entities[this.owner].skill.bls * 3)) * this.spdFactor;
        bullet.vy = (Math.sin(entity.facing + this.angle + spraySize) * (20 + room.entities[this.owner].skill.bls * 3)) * this.spdFactor;
        bullet.decreaseVelocity = false;
        bullet.facing = entity.facing + Math.PI + this.angle;
        bullet.team = entity.team;
        bullet.diesOnRange = true;
        bullet.canBypassBorder = true;
        bullet.health = (1 + ((room.entities[this.owner].skill.pen / 2))) * this.penFactor;
        bullet.range = 60 + ((room.entities[this.owner].skill.pen) * 2);
        bullet.range *= this.rangeFactor;
        bullet.maxHealth = bullet.health;
        bullet.owner = this.owner;
        bullet.skill = {
            rld: room.entities[this.owner].skill.rld, // Reload
            spd: 0, // Movement Speed
            dmg: room.entities[this.owner].skill.dmg, // Bullet Damage
            pen: room.entities[this.owner].skill.pen, // Bullet penetration
            bls: room.entities[this.owner].skill.bls, // Bullet Speed
            hlt: 0, // Max health
            heal: 0, // Health Regen
            bdmg: 0, // Body Damage
        };
        bullet.color = room.entities[this.owner].color;
        bullet.damage = (1 + room.entities[this.owner].skill.dmg + (((room.entities[this.owner].skill.pen * this.penFactor) + 1) / 10)) * this.damageFactor;
    }
    loop() {
        if (this.barrelAnimationResetTime < Date.now()) this.barrelAnimation = 0;
        if (this.previousFrame.shooting != room.entities[this.owner].shooting) {
            if (room.entities[this.owner].shooting) {
                this.coolingDown = true;
                this.delayTime = this.delay * (server.fps / 2) / Math.sqrt(Math.sqrt(room.entities[this.owner].skill.rld + 1));
            } else {
                this.coolingDown = false;
            };
        };
        if (this.reloadTime >= 1) {
            this.reloadTime--;
        } else {
            if (this.reloadTime != 0) this.reloadTime = 0;
        };
        if (this.coolingDown) {
            this.delayTime--;
        } else {
            if (this.delayTime != 1) this.delayTime = 1;
        };
        if (this.delayTime <= 0) {
            this.delayTime = 0;
        };
        if (room.entities[this.owner].shooting) {
            this.shoot();
        };
        /*if (this.previousFrame.skill.rld != room.entities[this.owner].skill.rld) {
          this.reloadTime = this.delay * (server.fps / 2) / Math.sqrt(Math.sqrt(room.entities[this.owner].skill.rld + 1));
        };*/
        this.previousFrame.shooting = room.entities[this.owner].shooting;
        this.previousFrame.skill.rld = room.entities[this.owner].skill.rld;
    }
}

class Entity {
    constructor(x, y, name, id, size = 10, type = "tank", connection = null, hasSpawnAnimation = false) {
        this.healthBasedOnLevel = type == "tank";
        this.godMode = false;
        this.scoreLock = null;
        this.resetsOnDeath = false;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.canMove = true;
        this.name = name;
        this.id = id;
        this.team = this.id;
        this.facing = 0;
        this.input = [0, 0, 0, 0];
        this.speed = 15;
        this.size = size;
        this.level = 1;
        this.maxLevel = 50;
        this.fieldFactor = 1;
        this.score = 0;
        this.fov = 1;
        this.class = 0;
        this.decreaseVelocity = true;
        this.showName = true;
        this.showHealth = true;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.type = type;
        this.range = 60;
        this.shooting = false;
        this.barrels = [];
        this.orbitAngle = Math.random() * (Math.PI * 2);
        this.gottenUpgrades = {
            tier1: false,
            tier2: false,
            tier3: false,
        };
        this.upgradesToGet = {
            tier1: [],
            tier2: [],
            tier3: [],
        };
        this.diesOnRange = false;
        this.color = 9;
        this.moveDirection = Math.random() * (Math.PI * 2);
        this.connection = connection;
        this.addSize = 0;
        this.dieTime = 5;
        this.alpha = 1;
        this.canBypassBorder = false;
        this.onDeath = function() {};
        this.hasAI = false;
        this.AISettings = {
            fov: -1,
            ignoresOwnTeam: true,
            attacksDefaultTeam: true,
            onlyAttacksTanks: true,
            runs: true,
            orbitsAroundEnemy: false,
            facingLerp: 0.45,
            upgrade: false,
            upgradeSkill: false,
            randomAim: false,
        };
        this.lastCollided = null;
        this.lastHurtedEnemy = null;
        this.value = 0;
        this.gaveScore = false;
        this.owner = null;
        this.collides = true;
        this.damages = true;
        this.damage = 10;
        this.barrelFlash = 0;
        this.shieldFlash = 0;
        this.shieldFlashTime = 5;
        this.inVulnerable = false;
        this.inVulnerableTime = 0;
        this.getPointsOn = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 32, 33, 35, 37, 39, 41,
            43, 45, 46, 47, 48, 49, 50
        ];
        this.skill = {
            rld: 0, // Reload
            spd: 0, // Movement Speed
            dmg: 0, // Bullet Damage
            pen: 0, // Bullet penetration
            bls: 0, // Bullet Speed
            hlt: 0, // Max health
            heal: 0, // Health Regen
            bdmg: 0, // Body Damage
        };
        this.previousFrame = {
            health: 0,
            level: -1,
            score: -1,
            maxHealth: 0,
            skill: {
                spd: 0, // Movement Speed
                hlt: 0,
                bdmg: 0,
            },
            class: this.class,
            dieTime: this.dieTime
        };
        this.healTime = Date.now() + 10000;
        this.barrelFlashResetTime = 0;
        this.upgrades = [];
        this.hasSpawnAnimation = false;
        this.spawnAnimation = 0;
        if (hasSpawnAnimation) {
            this.hasSpawnAnimation = true;
            this.alpha = 1;
            this.spawnAnimation = -30;
        };
        if (this.type == "tank") {
            switch (room.teams) {
                case 2: {
                    this.color = Math.round(util.getRandomFromRange(9, 10));
                    this.team = this.color == 9 ? 1 : 0;
                }
                break;
            case 4: {
                this.team = Math.floor(Math.random() * 4);
                this.color = [10, 9, 11, 6][this.team];
            }
            break;
            };
            if (room.ffa == false) {
                switch (room.teamBaseMode) {
                    case 1:
                    case 0: {
                        let baseSize = room.width / room.baseSize;
                        switch (this.team) {
                            case 0: { // Orange
                                this.x = util.getRandomFromRange(-(room.width / 2) + (baseSize / 2), -(room.width / 2) + (baseSize / 2) + baseSize); // left
                                this.y = util.getRandomFromRange(room.height / 2 - baseSize - (baseSize / 2), room.height / 2 - baseSize - (baseSize / 2) +
                                    baseSize); // bottom
                            }
                            break;
                        case 1: { // Red
                            this.x = util.getRandomFromRange((room.width / 2 - baseSize) - (baseSize / 2), (room.width / 2 - baseSize) - (baseSize / 2) +
                                baseSize); // right
                            this.y = util.getRandomFromRange(-(room.height / 2) + (baseSize / 2), -(room.height / 2) + (baseSize / 2) + baseSize); // up
                        }
                        break;
                        case 2: { // Green
                            this.x = util.getRandomFromRange(-(room.width / 2) + (baseSize / 2), -(room.width / 2) + (baseSize / 2) + baseSize); // left
                            this.y = util.getRandomFromRange(-(room.height / 2) + (baseSize / 2), -(room.height / 2) + (baseSize / 2) + baseSize); // up
                        }
                        break;
                        case 3: { // Blue
                            this.x = util.getRandomFromRange((room.width / 2 - baseSize) - (baseSize / 2), (room.width / 2 - baseSize) - (baseSize / 2) +
                                baseSize); // right
                            this.y = util.getRandomFromRange(room.height / 2 - baseSize - (baseSize / 2), room.height / 2 - baseSize - (baseSize / 2) +
                                baseSize); // bottom
                        }
                        break;
                        };
                    }
                    break;
                };
            };
        };
        this.goToBase = false;
        this.factor = {
            size: 1,
            speed: 1,
            health: 1,
        };
        this.showsOnLeaderboard = false;
        this.skillPoints = 0;
        this.ranOnDeath = false;
        this.kills = 0;
        this.changeMaxHealth = true;
        if (this.type == "tank") this.define("Tank");
        room.entities[this.id] = this;
    }
    define(id) {
        this.barrelFlash = 1;
        this.barrelFlashResetTime = 1;
        if (typeof id == "string") {
            id = entityConfig.stringEntityTypes[id];
        };
        this.class = id;
        this.barrels = [];
        for (let i = 0; i < entityConfig.entityTypes[id].barrels.length; i++) {
            let barrel = entityConfig.entityTypes[id].barrels[i];
            this.barrels.push(new Barrel(this.id, barrel.reload, barrel.delay, barrel.width, barrel.height / 3, barrel.angle, barrel.offset, barrel.recoil,
                barrel.bullet == undefined ? 1 : barrel.bullet.damageFactor, barrel.bullet == undefined ? 1 : barrel.bullet.rangeFactor, barrel
                .bullet == undefined ? 1 : barrel.bullet.penFactor, barrel.bullet == undefined ? 1 : barrel.bullet.spdFactor, barrel.bullet ==
                undefined ? 1 : barrel.bullet.sprFactor, barrel.canShoot));
        };
        this.gottenUpgrades = {
            tier1: room.peopleCanUpgrade ? false : true,
            tier2: room.peopleCanUpgrade ? false : true,
            tier3: room.peopleCanUpgrade ? false : true,
        };
        this.upgrades = [];
        if (this.connection != null) this.connection.send(protocol.encode("upgradeReset"));
        this.upgradesToGet = entityConfig.upgradeTree[entityConfig.entityTypes[this.class].name];
        this.fieldFactor = entityConfig.entityTypes[id].fieldFactor || 1;
        this.factor.size = entityConfig.entityTypes[id].sizeFactor || 1;
        this.factor.speed = entityConfig.entityTypes[id].spdFactor || 1;
        this.canMove = entityConfig.entityTypes[id].canMove;
        this.factor.health = entityConfig.entityTypes[id].hltFactor || 1;
        this.fov = util.getFOV(this.size) * this.fieldFactor;
    };
    kill(addKill = true) {
        this.hasSpawnAnimation = false;
        if (!this.resetsOnDeath) {
            this.dying = true;
        } else this.health = this.maxHealth;
        if (!this.ranOnDeath) {
            this.ranOnDeath = true;
            this.onDeath();
            if (this.connection != null) {
                if (this.connection.loggedIn) {
                    if (addKill) accounts[this.connection.accountID].deaths = parseInt(accounts[this.connection.accountID].deaths + 1);
                    accounts[this.connection.accountID].kills = parseInt(accounts[this.connection.accountID].kills) + this.kills;
                    accounts[this.connection.accountID].score = parseInt(accounts[this.connection.accountID].score) + this.score;
                    accounts[this.connection.accountID].level = Math.sqrt(accounts[this.connection.accountID].score / 20000) * Math.max(1, (accounts[this.connection.accountID].score / 500000));
                };
            };
        };
    };
    onDeath() {

    };
    loop() {
        if (this.inVulnerable) {
            if (!this.godMode) this.godMode = true;
            if (this.shieldFlashTime < 0) {
                this.shieldFlashTime = 5;
                this.shieldFlash = this.shieldFlash == 0 ? 1 : 0;
            } else this.shieldFlashTime--;
            if (this.inVulnerableTime < Date.now()) {
                this.inVulnerable = false;
                this.godMode = false;
            };
        } else {
            if (this.shieldFlash != 0) this.shieldFlash = 0;
        };
        if (this.godMode) {
            if (this.maxHealth != this.health) this.health = this.maxHealth;
        };
        if (this.scoreLock != null) {
            if (this.previousFrame.score != this.score) this.score = this.scoreLock;
        };
        if (this.hasSpawnAnimation) {
            this.spawnAnimation--
        };
        if (this.hasAI) {
            if (this.AISettings.orbitsAroundEnemy) {
                this.orbitAngle += this.speed / 400;
                //this.orbitAngle = this.orbitAngle % (Math.PI * 2);
                //if (this.orbitAngle > Math.PI * 2) this.orbitAngle -= Math.PI * 2;
            };
            let entities = [];
            for (let key in room.entities) {
                if (key != this.id && (this.AISettings.ignoresOwnTeam ? room.entities[key].team != this.team : true) && (this.AISettings
                        .attacksDefaultTeam ? true : room.entities[key].team != -1) && (this.AISettings.onlyAttacksTanks ? room.entities[key].type ==
                        "tank" : true) && room.entities[key].type != "bullet") {
                    entities.push({
                        id: key,
                        x: room.entities[key].x,
                        y: room.entities[key].y,
                        vx: room.entities[key].vx,
                        vy: room.entities[key].vy,
                        size: room.entities[key].size,
                    });
                };
            };
            let thisPos = {
                x: this.x,
                y: this.y
            };
            entities.sort(function(a, b) {
                return util.distance(thisPos, a) - util.distance(thisPos, b);
            });
            let entity = entities[0];
            if (entity != undefined) {
                let pos = {
                    x: (entity.x + (entity.vx * 8) - this.x) + (Math.cos(this.orbitAngle) * 800),
                    y: (entity.y + (entity.vy * 8) - this.y) + (Math.sin(this.orbitAngle) * 800),
                };
                if ((this.AISettings.randomAim ? Math.random() > 0.9 : true)) {
                    let facing = Math.atan2((entity.y + (entity.vy * 8) - this.y), (entity.x + (entity.vx * 8) - this.x));
                    this.facing = util.lerpAngle(this.facing, facing, this.AISettings.facingLerp);
                    if (this.AISettings.randomAim && Math.random() > 0.5) {
                        this.facing = facing;
                    };
                };
                let facing = Math.atan2(pos.y, pos.x);
                this.vx = util.lerp(this.vx, Math.cos(facing) * this.speed, 0.1);
                this.vy = util.lerp(this.vy, Math.sin(facing) * this.speed, 0.1);
                this.shooting = true;
            } else {
                this.shooting = false;
                this.facing += 0.025;
            };
        }
        if (this.type == "bDrone") {
            this.orbitAngle += 0.05;
            if (Math.random() > 0.999) this.orbitAngle += Math.PI
            if (this.orbitAngle > Math.PI * 2) this.orbitAngle -= Math.PI * 2;
            let entities = [];
            for (let key in room.entities) {
                if (key != this.id && room.entities[key].team != this.team && room.entities[key].team != -1 && room.entities[key].type == "tank") {
                    entities.push({
                        id: key,
                        x: room.entities[key].x,
                        y: room.entities[key].y,
                    });
                };
            };
            let thisPos = {
                x: this.x,
                y: this.y
            };
            entities.sort(function(a, b) {
                return util.distance(thisPos, a) - util.distance(thisPos, b);
            });
            let baseSize = room.width / room.baseSize;
            if (!this.goToBase) {
                if (entities.length == 0) {
                    this.goToBase = true;
                } else if (util.distance(thisPos, entities[0]) > 3000) {
                    this.speed = 50;
                    entities = [{
                        x: util.getBasePos(0, this.team) + (Math.cos(this.orbitAngle) * 300),
                        y: util.getBasePos(1, this.team) + (Math.sin(this.orbitAngle) * 300)
                    }];
                };
            };
            if (util.distance({
                    x: util.getBasePos(0, this.team),
                    y: util.getBasePos(1, this.team)
                }, thisPos) > 3000) {
                this.goToBase = true;
            };
            if (this.goToBase) {
                if (this.speed != 20) this.speed = 20;
                entities = [{
                    x: util.getBasePos(0, this.team) + (Math.cos(this.orbitAngle) * 300),
                    y: util.getBasePos(1, this.team) + (Math.sin(this.orbitAngle) * 300)
                }];
            };
            if (util.distance({
                    x: util.getBasePos(0, this.team),
                    y: util.getBasePos(1, this.team)
                }, thisPos) < 500) {
                this.goToBase = false;
            };
            let entity = entities[0];
            this.facing = util.lerpAngle(this.facing, Math.atan2(entity.y - this.y, entity.x - this.x) + Math.PI, 0.45);
            this.vx = util.lerp(this.vx, Math.cos(this.facing + Math.PI) * this.speed, 0.1);
            this.vy = util.lerp(this.vy, Math.sin(this.facing + Math.PI) * this.speed, 0.1);
        };
        if (this.barrelFlashResetTime == 0) this.barrelFlash = 0;
        if (this.barrelFlashResetTime != 0) this.barrelFlashResetTime = 0;
        for (let key in this.skill) {
            if (this.skill[key] >= 9) {
                this.skill[key] = 8;
            };
        };
        for (let key in this.barrels) {
            if (this.barrels[key].canShoot) this.barrels[key].loop();
        };
         this.health += (50 / this.maxHealth) * (this.skill.heal / 500);
    // 10 second heal system
    if (this.health <= 0) this.kill();
    if (this.health < this.previousFrame.health) this.healTime = Date.now() + 10000; // Wait for 10 seconds to heal
    if (this.health != this.previousFrame.health) {
      // Check if our health is more than our max health. if it is, make our health our max health.
      if (this.health > this.maxHealth) this.health = this.maxHealth;
    };
        if (this.type == "food") {
            this.moveDirection += 0.005;
            if (this.moveDirection > Math.PI * 2) this.moveDirection -= Math.PI * 2;
            this.facing += 0.01;
            if (this.facing > Math.PI * 2) this.facing -= Math.PI * 2;
            this.vx += Math.cos(this.moveDirection) / 8;
            this.vy += Math.sin(this.moveDirection) / 8;
        };
        if (this.score != this.previousFrame.score) {
            this.level = util.getLevelFromScore(this.score);
            if (this.level > this.maxLevel) {
                this.level = this.maxLevel;
            };
        };
        if (this.skill.hlt != this.previousFrame.skill.hlt && this.type == "tank" && this.previousFrame.class != this.class || (this.type == "tank" ? this.level != this.previousFrame.level : false) && this.changeMaxHealth) {
            //let previousHealth = this.health / this.maxHealth;
            this.maxHealth = (this.healthBasedOnLevel ? util.getHealthFromLevel(this.level) : 10) + ((this.skill.hlt * this.skill.hlt) / 50);
            this.maxHealth *= this.factor.health;
            this.health *= this.maxHealth / this.previousFrame.maxHealth
        };
        this.previousFrame.health = this.health;
        this.previousFrame.maxHealth = this.maxHealth;
        if (this.skill.bdmg != this.previousFrame.skill.bdmg && this.type == "tank") {
            this.damage = 1 + (this.skill.bdmg * this.skill.bdmg)
        };
        if (this.type == "tank") {
            if (this.level != this.previousFrame.level || this.skill.spd != this.previousFrame.skill.spd || this.upgradesToGet != this.previousFrame
                .upgradesToGet) {
                if (this.upgradesToGet.tier1.length != 0) {
                    if (this.level >= config.tierConfig.tier1 && !this.gottenUpgrades.tier1) {
                        this.gottenUpgrades.tier1 = true;
                        for (let i = 0; i < this.upgradesToGet.tier1.length; i++) {
                            this.upgrades.push(this.upgradesToGet.tier1[i]);
                            if (this.connection != null) this.connection.send(protocol.encode("upgrade", this.upgradesToGet.tier1[i]));
                        };
                        if (this.AISettings.upgrade) {
                            this.define(this.upgrades[Math.floor(Math.random() * this.upgrades.length)]);
                        };
                    };
                };
                if (this.upgradesToGet.tier2.length != 0) {
                    if (this.level >= config.tierConfig.tier2 && !this.gottenUpgrades.tier2) {
                        this.gottenUpgrades.tier2 = true;
                        for (let i = 0; i < this.upgradesToGet.tier2.length; i++) {
                            this.upgrades.push(this.upgradesToGet.tier2[i]);
                            if (this.connection != null) this.connection.send(protocol.encode("upgrade", this.upgradesToGet.tier2[i]));
                        };
                        if (this.AISettings.upgrade) {
                            this.define(this.upgrades[Math.floor(Math.random() * this.upgrades.length)]);
                        };
                    };
                };
                if (this.upgradesToGet.tier3.length != 0) {
                    if (this.level >= config.tierConfig.tier3 && !this.gottenUpgrades.tier3) {
                        this.gottenUpgrades.tier3 = true;
                        for (let i = 0; i < this.upgradesToGet.tier3.length; i++) {
                            this.upgrades.push(this.upgradesToGet.tier3[i]);
                            if (this.connection != null) this.connection.send(protocol.encode("upgrade", this.upgradesToGet.tier3[i]));
                        };
                        if (this.AISettings.upgrade) {
                            this.define(this.upgrades[Math.floor(Math.random() * this.upgrades.length)]);
                        };
                    };
                };
                this.fov = util.getFOV(this.size) * this.fieldFactor;
                this.speed = (util.getSpeedFromLevel(this.level) * ((this.skill.spd / 10) + 1)) * this.factor.speed;
                this.size = (util.getSize(this.level) * this.factor.size) + this.addSize;
            };
        };
        if (this.previousFrame.dieTime != this.dieTime && this.type == "tank") {
            this.size = (util.getSize(this.level) * this.factor.size) + this.addSize;
        };
        this.previousFrame.upgradesToGet = this.upgradesToGet;
        this.previousFrame.score = this.score;
        this.previousFrame.skill.spd = this.skill.spd;
        this.previousFrame.skill.hlt = this.skill.hlt;
        this.previousFrame.skill.bdmg = this.skill.bdmg;
        this.previousFrame.class = this.class;
        if (this.previousFrame.level != this.level && this.previousFrame.level > 0) {
            for (let i = 0; i < this.level; i++) {
                for (let i2 = 0; i2 < this.getPointsOn.length; i2++) {
                    if (this.getPointsOn.includes((this.level - i))) {
                        this.getPointsOn.shift();
                        this.skillPoints++;
                        if (this.AISettings.upgradeSkill) {
                            this.skillPoints--;
                            let randomChoose = ["rld", "spd", "dmg", "pen", "bls"];
                            for (let i = 0; i < randomChoose.length; i++) {
                                if (this.skill[randomChoose] == 8) {
                                    const index = randomChoose.indexOf(randomChoose[i]);
                                    if (index > -1) {
                                        array.splice(index, 1);
                                    }
                                }
                            };
                            randomChoose = randomChoose[Math.floor(Math.random() * randomChoose.length)];
                            this.skill[randomChoose]++;
                        };
                        if (this.connection != null) this.connection.send(protocol.encode("skill", 1));
                    };
                };
            };
        };
        this.previousFrame.level = this.level;
        this.previousFrame.dieTime = this.dieTime;
        if (this.decreaseVelocity) {
            this.vx = util.lerp(this.vx, 0, 0.1);
            this.vy = util.lerp(this.vy, 0, 0.1);
        };
        if (this.input[0]) this.vx = util.lerp(this.vx, -this.speed, 0.1);
        if (this.input[1]) this.vx = util.lerp(this.vx, this.speed, 0.1);
        if (this.input[2]) this.vy = util.lerp(this.vy, -this.speed, 0.1);
        if (this.input[3]) this.vy = util.lerp(this.vy, this.speed, 0.1);
        if (this.diesOnRange) {
            this.range--;
            if (this.range < 0) {
                this.kill();
            };
        };
        if (this.canMove != false) {
            this.x += this.vx;
            this.y += this.vy;
        } else {
            if (this.vx != 0) this.vx = 0;
            if (this.vy != 0) this.vy = 0;
        }
        if (!this.canBypassBorder) {
            if (this.x > (room.width - room.width / 2) + config.mapBorderSize) this.x = (room.width - room.width / 2) + config.mapBorderSize;
            if (this.y > (room.height - room.height / 2) + config.mapBorderSize) this.y = (room.height - room.height / 2) + config.mapBorderSize;
            if (this.x < -room.width / 2 - config.mapBorderSize) this.x = -room.width / 2 - config.mapBorderSize;
            if (this.y < -room.height / 2 - config.mapBorderSize) this.y = -room.height / 2 - config.mapBorderSize;
        };
        if (this.dying) {
            this.collides = false;
            this.damages = false;
            this.shooting = false;
            this.dieTime--;
            this.alpha = this.dieTime / 5;
            this.type == "tank" ? this.addSize += 4 : this.size += 4;
            if (!this.gaveScore) {
                let killer = room.entities[this.lastHurtedEnemy];
                if (killer != undefined) {
                    if (room.entities[killer.owner] != undefined) {
                        if (this.type == "food") {
                            room.entities[killer.owner].score += this.value;
                        } else if (this.type == "tank") {
                            if (this.score > server.level50Score) {
                                room.entities[killer.owner].score += server.level50Score;
                            } else room.entities[killer.owner].score += this.score;
                            room.entities[killer.owner].score += this.value;
                            if (room.entities[killer.owner].connection != null) {
                                let connection = room.entities[killer.owner].connection;
                                room.entities[killer.owner].kills++;
                                connection.send(protocol.encode("kill"));
                            }
                        };
                    } else if (this.type == "food") {
                        killer.score += this.value;
                    } else if (this.type == "tank") {
                        if (this.score > server.level50Score) {
                            killer.score += server.level50Score;
                        } else killer.score += this.score;
                        killer.score += this.value;
                        if (killer.connection != null) {
                            let connection = killer.connection;
                                connection.send(protocol.encode("kill"));
                                killer.kills++;
                        };
                    };
                };
                this.gaveScore = true;
            };
            if (this.dieTime < 0) {
                if (this.type == "food") room.shapeAmount--;
                if (this.connection != null) this.connection.spawned = false, this.connection.dead = true, this.connection.send(protocol.encode("death",
                        room.entities[this.lastHurtedEnemy] == undefined ? 0 : (room.entities[room.entities[this.lastHurtedEnemy].owner] == undefined ?
                            room.entities[this.lastHurtedEnemy].class : room.entities[room.entities[this.lastHurtedEnemy].owner].class))), this.connection
                    .send(protocol.encode("upgradeReset"));
                delete room.entities[this.id];
                return;
            };
        };
    }
}
const idGenerator = new IDGenerator();
app.ws('/server', function(ws, req) {
    ws.on('error', function() {});
    ws.ip = req.headers['x-forwarded-for'] == undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for'].split(",")[0];
    if (ipBans.includes(crypto.createHash("sha256").update(ws.ip).digest("hex"))) {
        ws.terminate();
        return;
    };
    ws.binaryType = "arraybuffer";
    ws.camera = {
        x: 0,
        y: 0,
        fov: 2,
    };
    ws.liveTime = 250;
    ws.id = idGenerator.generateId();
    ws.loggedIn = false;
    ws.terminalAccessLevel = 0;
    ws.ban = function() {
        // kick the player
        ws.close();
        if (!ipBans.includes(crypto.createHash("sha256").update(ws.ip).digest("hex"))) {
            ipBans.push(crypto.createHash("sha256").update(ws.ip).digest("hex"));
        };
    };
    ws.onclose = function() {
        if (ws.spawned) {
            room.entities[ws.id].kill(false);
        };
        delete room.clients[ws.id];
        if (config.mapChangesToPlayerAmount) {
            room.width = 1000 + (Object.keys(room.clients).length * 500);
            room.height = room.width;
            room.maxShapes =
                broadcastRoom();
        };
    };
    room.clients[ws.id] = ws;
    console.log(prefix + "INFO: A client just connected.");
    if (config.mapChangesToPlayerAmount) {
        room.width = 1000 + (Object.keys(room.clients).length * 500);
        room.height = room.width;
        room.maxShapes =
            broadcastRoom();
    };
    ws.on('message', function incoming(message) {
        if (!(message instanceof ArrayBuffer)) {
            console.log(prefix + "WARNING: Got sent non-binary packet.");
            ws.ban();
            return;
        };
        ws.warnings = 0;
        message = protocol.decode(message)
        let type = message[0];
        message.shift();
        switch (type) {
            case "unknown": {
                console.log(prefix + "WARNING: Got sent a unknown packet.");
                ws.ban();
                return;
            }
            break;
        case "error": {
            console.log(prefix + "WARNING: A packet has encountered a error while getting decoded.");
            ws.ban();
            return;
        }
        break;
        case "input": {
            if (ws.spawned) {
                if (message[0] || message[1] || message[2] || message[3] || message[5]) {
                    if (room.entities[ws.id].inVulnerable) {
                        room.entities[ws.id].inVulnerable = false;
                        room.entities[ws.id].godMode = false;
                    };
                };
                room.entities[ws.id].input = [message[0], message[1], message[2], message[3]];
                room.entities[ws.id].facing = message[4];
                room.entities[ws.id].shooting = message[5];
            };
        }
        break;
        case "spawn": {
            if (!ws.spawned) {
                if (message[0].length > 24) {
                    console.log(prefix + "INFO: A client connected with a name longer than 24 letters.");
                    ws.close();
                    return;
                };
                ws.spawned = true;
                console.log(prefix + "INFO: A client is spawning... Name: " + message[0]);
                ws.send(protocol.encode("goingInGame"));
                let player = new Entity((Math.random() * room.width) - room.width / 2, (Math.random() * room.height) - room.height / 2, message[
                    0], ws.id, 50, "tank", ws);
                player.inVulnerable = true;
                player.inVulnerableTime = Date.now() + 30000;
                player.showsOnLeaderboard = true;
                ws.team = player.team;
                ws.send(protocol.encode("playerId", ws.id));
                room.treeRefresh();
                broadcastRoom();
            } else {
                console.log(prefix + "WARNING: A client is trying to spawn while already spawned. Name: " + message[0]);
                ws.close();
                return;
            };
        }
        break;
        case "terminal": {
            let args = message[0].split(' ');
                switch (args[0]) {
                    case "eval":
                        if (ws.terminalAccessLevel == 2) {
                        try {
                            let output = eval(message[0].slice(5));
                            ws.send(protocol.encode("terminalOutput", "Output: " + output));
                        } catch (e) {
                            ws.send(protocol.encode("terminalOutput", "Output: " + e));
                        }
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 2 to use this command"));
                        return;
                    };
                        break;
                    case "setUserPermission": {
                        if (ws.terminalAccessLevel == 2) {
                        let stuff = message[0].split(" ");
                        if (stuff.length != 3) {
                            ws.send(protocol.encode("terminalOutput", "Please use the command correctly. Usage: \"setUserPermission user_name permission\""));
                            return;
                        };
                        for (let key in accounts) {
                            if (stuff[1] == accounts[key].name) {
                                accounts[key].terminalAccessLevel = stuff[2];
                                ws.send(protocol.encode("terminalOutput", "Succesfully set the permission of account " + accounts[key].name + " to " + stuff[2]));
                            };
                        };
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 2 to use this command"));
                        return;
                    };
                    } break;
                    case "logout": {
                        ws.terminalAccessLevel = 0;
                        ws.send(protocol.encode("terminalOutput", "Logged out"));
                        ws.loggedIn = false;
                    } break;
                    case "setScore":
                        if (ws.terminalAccessLevel == 2) {
                        if (ws.spawned) {
                            room.entities[ws.id].score = message[0].slice(9);
                        };
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 2 to use this command"));
                        return;
                    };
                        break;
                    case "setTank":
                        if (ws.terminalAccessLevel == 2) {
                        if (ws.spawned) {
                            room.entities[ws.id].define(message[0].slice(8));
                        };
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 2 to use this command"));
                        return;
                    };
                        break;
                    case "playerList":
                        if (ws.terminalAccessLevel >= 1) {
                            let output = "";
                            for (let key in room.entities) {
                                if (room.entities[key].connection != null) {
                                    output += room.entities[key].name + ", " + key + "\n";
                                };
                            };
                            ws.send(protocol.encode("terminalOutput", output));
                        } else {
                            ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 1 to use this command"));
                            return;
                        };
                        break;
                    case "ban":
                        if (ws.terminalAccessLevel >= 1) {
                        for (let key in room.clients) {
                            if (room.clients[key].id == message[0].slice(4)) {
                                room.clients[key].ban();
                            };
                        };
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Permission error: Your terminalAccessLevel must be atleast 1 to use this command"));
                        return;
                    };
                        break;
                    case "accountInfo":
                        if (ws.loggedIn) ws.send(protocol.encode("account", 0, Math.floor(accounts[ws.accountID].score), Math.floor(accounts[ws.accountID].level), accounts[ws.accountID].color, accounts[ws.accountID].name, accounts[ws.accountID].creationDate, accounts[ws.accountID].tank, accounts[ws.accountID].kills, accounts[ws.accountID].deaths));
                        break;
                };
        }
        break;
        case "levelUp": {
            if (ws.spawned) {
                if (config.publicCheatingLevel >= 1) {
                    if (room.entities[ws.id].score <= util.getScoreFromLevel(room.entities[ws.id].maxLevel)) {
                        room.entities[ws.id].level++;
                        room.entities[ws.id].score = util.getScoreFromLevel(room.entities[ws.id].level);
                    };
                };
            };
        }
        break;
        case "skillUpgrade": {
            if (ws.spawned) {
                if (room.entities[ws.id].skillPoints > 0) {
                    //room.entities[ws.id].stats.spd++;
                    switch (message[0]) {
                        case 0:
                            room.entities[ws.id].skill.spd++;
                            break;
                        case 1:
                            room.entities[ws.id].skill.rld++;
                            break;
                        case 2:
                            room.entities[ws.id].skill.dmg++;
                            break;
                        case 3:
                            room.entities[ws.id].skill.pen++;
                            break;
                        case 4:
                            room.entities[ws.id].skill.bls++;
                            break;
                        case 6:
                            room.entities[ws.id].skill.bdmg++;
                            break;
                        case 6:
                            room.entities[ws.id].skill.hlt++;
                            break;
                        case 7:
                            room.entities[ws.id].skill.heal++;
                            break;
                    };
                    room.entities[ws.id].skillPoints--;
                };
            };
            /*room.entities[ws.id].level++;
            room.entities[ws.id].score = util.getScoreFromLevel(room.entities[ws.id].level);*/
        }
        break;
        case "upgrade": {
            if (ws.spawned) {
                if (message[0] > room.entities[ws.id].upgrades.length - 1) {
                    return;
                } else room.entities[ws.id].define(room.entities[ws.id].upgrades[message[0]]);
            };
        }
        break;
        case "livingAlert": {
            ws.liveTime = 250;
        }
        break;
        case "login": {
            if (message[0] == 1) { // register request
                    if (ws.loggedIn) {
                        ws.send(protocol.encode("terminalOutput", "You are already logged in!"));
                        return;
                    };
                    if (message[1] == "" && message[2] == "") {
                        ws.send(protocol.encode("terminalOutput", "Enter something first"));
                        return;
                    };
                    if (message[1] == "") {
                        ws.send(protocol.encode("terminalOutput", "Your name cannot be empty"));
                        return;
                    };
                    if (message[2] == "") {
                        ws.send(protocol.encode("terminalOutput", "Your password cannot be empty"));
                        return;
                    };
                    if (message[2].length <= 4) {
                        ws.send(protocol.encode("terminalOutput", "Your password needs to be atleast 5 letters long"));
                        return;
                    };
                    let result = createAccount(message[1], message[2]);
                    if (result == 0) {
                        ws.send(protocol.encode("terminalOutput", "Sorry, name already taken."));
                    } else {
                        if (message[1].includes(" ")) {
                            ws.send(protocol.encode("terminalOutput", "Please prevent your name from having a space"));
                            return;
                        }
                        ws.send(protocol.encode("terminalOutput", "You are now successfully registered. To login, use the password and username you used."));
                    };
            } else {
                if (ws.loggedIn) {
                    ws.send(protocol.encode("terminalOutput", "You are already logged in!"));
                    return;
                };
                    let result = checkAccount(message[1], message[2]);
                    if (result == false) {
                        ws.send(protocol.encode("terminalOutput", "Wrong name or password"));
                    } else {
                        ws.send(protocol.encode("terminalOutput", "Succesfully logged in to the acc " + accounts[result[1]].name + ", your access level: " + accounts[result[1]].terminalAccessLevel));
                        ws.send(protocol.encode("account", 1));
                        ws.loggedIn = true;
                        ws.accountID = result[1];
                        ws.terminalAccessLevel = accounts[result[1]].terminalAccessLevel;
                    };
            };
        };
        };
    });
    ws.send(protocol.encode("roomInfo", room.width, room.height, room.gm, config.accountsEnabled));
    ws.send(protocol.encode("dominationColors", room.dominationColors));
    ws.send(server.entityTypesPacket);
    console.log(prefix + "INFO: Sent entityTypes packet.");
});
console.log("Server started at port " + config.port);
console.log("Map Width: " + room.width);
console.log("Map Height: " + room.height);
const createBot = (() => {
    let makeBot = function(name) {
        let bot = new Entity((Math.random() * room.width) - room.width / 2, (Math.random() * room.height) - room.height / 2, name, idGenerator
            .generateId(), 50);
        bot.shooting = true;
        bot.hasAI = true;
        bot.AISettings = {
            fov: 3,
            ignoresOwnTeam: true,
            attacksDefaultTeam: true,
            onlyAttacksTanks: false,
            orbitsAroundEnemy: true,
            runs: true,
            facingLerp: 0.25,
            upgrade: true,
            upgradeSkill: true,
            randomAim: true,
        };
        //bruh.define("Annihilator");
        bot.showsOnLeaderboard = true;
        bot.previousFrame.level = 1;
        return bot;
    };
    return function(name) {
        let bot = makeBot(name);
        bot.onDeath = function() {
            createBot(name);
        };
    };
})();
for (let i = 0; i < config.botAmount; i++) {
    createBot(botNames.botNames[i]);
};
for (let i = 0; i < 0; i++) {
    for (let i2 = -1; i2 < 2; i2++) {
        let position = (function() {
            let x = i2 * 1000;
            let y = (-room.height / 2) - 300;
            //(-room.height / 2) - 300
            if (i == 1) {
                x = i2 * 1000;
                y = -((-room.height / 2) - 300);
            };
            if (i == 2) {
                x = (-room.height / 2) - 300;
                y = i2 * 1000;
            };
            if (i == 3) {
                x = -((-room.height / 2) - 300);
                y = i2 * 1000;
            };
            return {
                x: x,
                y: y,
            }
        })();
        let arenaCloser = new Entity(position.x, position.y, "Arena Closer", idGenerator.generateId(), 50);
        arenaCloser.scoreLock = 0;
        //arenaCloser.shooting = true;
        arenaCloser.hasAI = true;
        arenaCloser.define("Arena Closer");
        arenaCloser.skill.spd = 8;
        arenaCloser.showHealth = false;
        arenaCloser.skill.rld = 8;
        arenaCloser.skill.dmg = 8;
        arenaCloser.skill.pen = 8;
        arenaCloser.skill.bls = 8;
        arenaCloser.score = 0;
        arenaCloser.team = -1;
        arenaCloser.color = 12 + Math.round(Math.random() * 3);
        arenaCloser.factor.size = 3;
        arenaCloser.canBypassBorder = true;
        arenaCloser.godMode = true;
    };
};
function spawnFallenBoss(type = "Booster") {
    let boss = new Entity(0, 0, "Fallen " + type, idGenerator.generateId(), 50);
    boss.scoreLock = 0;
        //arenaCloser.shooting = true;
    boss.hasAI = true;
    boss.define(type);
    boss.skill.rld = 5;
    boss.skill.dmg = 4;
    boss.skill.pen = 4;
    boss.skill.bls = 6;
    boss.changeMaxHealth = false;
    boss.maxHealth = 30000;
    boss.health = 30000;
    boss.score = 0;
    boss.team = -1;
    boss.color = 4;
    boss.factor.size = 2.5;
    boss.canBypassBorder = true;
    boss.value = 100000;
};
let baseCount = room.teamBaseMode == -1 ? 0 : [2, 4][room.teamBaseMode];
for (let i = 0; i < baseCount; i++) {
    for (let i2 = 0; i2 < 4; i2++) {
        let baseSize = room.width / room.baseSize;
        let baseDrone = new Entity(util.getBasePos(0, i) + util.getRandomFromRange(-100, 100), util.getBasePos(1, i) + util.getRandomFromRange(-100, 100), "",
            idGenerator.generateId(), 20, "drone");
        baseDrone.team = i;
        baseDrone.color = [10, 9, 11, 6][i];
        baseDrone.type = "bDrone";
        baseDrone.godMode = true;
        baseDrone.speed = 20;
        baseDrone.fov = 4;
        baseDrone.define("Drone");
        baseDrone.showName = false;
        baseDrone.showHealth = false;
    };
};

function createShape(choose = (function() {
    let chance = Math.random();
    if (chance < 0.1) {
        chance = 3;
    };
    if (chance < 0.3) {
        chance = 2;
    };
    if (chance < 0.7) {
        chance = 1;
    };
    if (chance < 1) {
        chance = 0;
    };
    return chance
})(), alpha = Math.random() > 0.9, superAlpha = alpha ? Math.random() > 0.9 : false, spawnPosition = [(Math.random() * room.width) - room.width / 2, (Math
    .random() * room.height) - room.height / 2]) {
    let shapes = ["Square", "Triangle", "Pentagon", "Hexagon"]
    let shape = new Entity(spawnPosition[0], spawnPosition[1], "", idGenerator.generateId(), (40 + (choose * 15)) * (alpha ? 2 : 1) * (superAlpha ? 2 : 1),
        "food", null, true);
    shape.team = -1;
    shape.define(shapes[choose]);
    shape.color = 12 + choose;
    shape.showName = false;
    shape.facing = Math.random() * (Math.PI * 2);
    shape.maxHealth = ((((choose + 1) * (choose + 1)) * 5) * (alpha ? 250 : 1)) * (superAlpha ? 5 : 1);
    shape.health = shape.maxHealth;
    shape.value = (((choose + 1) * (choose + 1)) * 25) * (alpha ? 5 : 1) * (superAlpha ? 10 : 1);
    return shape;
};

function createShapeTree() {
    let mainShape = createShape(undefined, true, true, [(Math.random() * room.width) - room.width / 2, (Math.random() * room.height) - room.height / 2]);
    let count = 1;
    mainShape.onDeath = function() {
        count--;
        if (count <= 0) createShapeTree();
    };
    for (let i2 = 0; i2 < 2; i2++) {
        count++;
        let angle = Math.random() * (Math.PI * 2);
        let alphaShape = createShape(undefined, true, false, [mainShape.x + (Math.cos(angle) * 500), mainShape.y + (Math.sin(angle) * 500)]);
        alphaShape.onDeath = function() {
            count--;
            if (count <= 0) createShapeTree();
        };
        for (let i3 = 0; i3 < 5; i3++) {
            count++;
            angle = Math.random() * (Math.PI * 2);
            let smallShape = createShape(undefined, false, false, [alphaShape.x + (Math.cos(angle) * 500), alphaShape.y + (Math.sin(angle) * 500)]);
            smallShape.onDeath = function() {
                count--;
                if (count <= 0) createShapeTree();
            };
        };
    };
};
for (let i = 0; i < config.shapeTreeCount; i++) {
    createShapeTree();
};
function gameLoop() {
    room.tree.clear();
    if (room.shapeAmount < room.maxShapes) {
        room.shapeAmount++;
        let choose = Math.round(Math.random() * 3);
        let alpha = Math.random() > 0.975;
        let superAlpha = alpha ? Math.random() > 0.975 : false;
        let shapes = ["Square", "Triangle", "Pentagon", "Hexagon"]
        let spawnPosition = [(Math.random() * room.width) - room.width / 2, (Math.random() * room.height) - room.height / 2];
        if (alpha) {
            spawnPosition = [util.getRandomFromRange(-room.width / 10, room.width / 10), util.getRandomFromRange(-room.height / 10, room.height / 10)];
        }
        let shape = new Entity(spawnPosition[0], spawnPosition[1], "", idGenerator.generateId(), (40 + (choose * 15)) * (alpha ? 2 : 1) * (superAlpha ? 2 : 1),
            "food", null, true);
        shape.team = -1;
        shape.define(shapes[choose]);
        shape.color = 12 + choose;
        shape.showName = false;
        shape.facing = Math.random() * (Math.PI * 2);
        shape.maxHealth = (((choose + 1) * (choose + 1)) * 5) * (alpha ? 50 : 1) * (superAlpha ? 5 : 1);
        shape.health = shape.maxHealth;
        shape.damage *= .1;
        shape.value = (((choose + 1) * (choose + 1)) * 25) * (alpha ? 5 : 1) * (superAlpha ? 10 : 1);
    };
    for (let key in room.entities) {
        room.tree.insert({
            x: room.entities[key].x,
            y: room.entities[key].y,
            size: room.entities[key].size,
            width: room.entities[key].size,
            height: room.entities[key].size,
            id: room.entities[key].id,
        });
        room.entities[key].loop();
    };
    for (let key in room.entities) {
        let entity = room.entities[key];
        let candidates = room.tree.retrieve({
            x: entity.x,
            y: entity.y,
            radius: entity.size,
            width: entity.size,
            height: entity.size,
        });
        for (let candidate in candidates) {
            let candidateEntity = candidates[candidate];

            var dx = candidateEntity.x - entity.x;
            var dy = candidateEntity.y - entity.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            /*room.entities[candidate].size / 2;
            entity.size / 2;*/
            if (distance < (candidateEntity.size + entity.size) && candidateEntity.id != entity.id) {
                let angle = Math.atan2(entity.y - candidateEntity.y, entity.x - candidateEntity.x);
                if (room.entities[candidateEntity.id] != undefined) {
                    let damage = false;
                    let collide = false;
                    if (room.entities[candidateEntity.id].team != entity.team) damage = true, collide = true;
                    if (room.entities[candidateEntity.id].team != entity.team && room.entities[candidateEntity.id].type == "bullet" && entity.type == "bullet")
                        damage = true, collide = true;
                    if (room.entities[candidateEntity.id].team == entity.team && room.entities[candidateEntity.id].type == "food" && entity.type == "food")
                        damage = false, collide = true;
                    if (room.entities[candidateEntity.id].team == entity.team && room.entities[candidateEntity.id].type == "bDrone" && entity.type == "bDrone")
                        damage = false, collide = true;
                    if (room.entities[candidateEntity.id].team == entity.team && room.entities[candidateEntity.id].type == "tank" && entity.type == "tank")
                        damage = false, collide = true;
                    if (collide && (room.entities[candidateEntity.id].collides && entity.collides)) {
                        room.entities[candidateEntity.id].vx -= Math.cos(angle) / (5 / (entity.size / 50));
                        room.entities[candidateEntity.id].vy -= Math.sin(angle) / (5 / (entity.size / 50));
                        entity.vx += Math.cos(angle) / (5 / (room.entities[candidateEntity.id].size / 50));
                        entity.vy += Math.sin(angle) / (5 / (room.entities[candidateEntity.id].size / 50));
                    };
                    if (damage && (room.entities[candidateEntity.id].damages && entity.damages)) {
            room.entities[candidateEntity.id].lastHurtedEnemy = entity.id;
            entity.lastHurtedEnemy = candidateEntity.id;
            if (room.entities[candidateEntity.id].team != entity.team) {
              entity.health -= room.entities[candidateEntity.id].damage / Math.sqrt(Math.sqrt(entity.damage));
              room.entities[candidateEntity.id].health -= entity.damage / Math.sqrt(Math.sqrt(room.entities[candidateEntity.id].damage));
            };
          };
                };
            };
            /*room.entities[candidate].size * 2;
            entity.size * 2;*/
        };
    };
    for (let key in room.clients) {
        let entities = [];
        if (room.clients[key].spawned) {
            if (room.clients[key].team != room.entities[room.clients[key].id].team) room.clients[key].team = room.entities[room.clients[key].id].team;
            room.clients[key].camera.x = room.entities[room.clients[key].id].x;
            room.clients[key].camera.y = room.entities[room.clients[key].id].y;
            room.clients[key].camera.fov = room.entities[room.clients[key].id].fov;
        } else if (room.clients[key].dead) {
            room.clients[key].camera.fov = 2;
        } else {
            room.clients[key].camera.x = 0;
            room.clients[key].camera.y = 0;
            room.clients[key].camera.fov = 4;
        };
        let candidates = room.tree.retrieve({
            x: room.clients[key].camera.x - room.clients[key].camera.fov * 1777 / 1.5,
            y: room.clients[key].camera.y - room.clients[key].camera.fov * 1000 / 1.5,
            width: room.clients[key].camera.fov * 3555 / 1.5,
            height: room.clients[key].camera.fov * 2000 / 1.5
        });
        for (let candidate in candidates) {
            let candidateEntity = candidates[candidate];
            //{x: room.clients[i].camera.x - room.clients[i].camera.fov * 1777.77778, y: room.clients[i].camera.y - room.clients[i].camera.fov * 1000, width: room.clients[i].camera.fov * 3555.55556, height: room.clients[i].camera.fov * 2000}
            if (room.entities[candidateEntity.id] != undefined) {
                let barrels = [];
                for (let i = 0; i < room.entities[candidateEntity.id].barrels.length; i++) {
                    barrels.push(room.entities[candidateEntity.id].barrels[i].barrelAnimation);
                };
                entities.push({
                    x: room.entities[candidateEntity.id].x,
                    y: room.entities[candidateEntity.id].y,
                    name: room.entities[candidateEntity.id].showName ? room.entities[candidateEntity.id].name : "",
                    id: room.entities[candidateEntity.id].id,
                    facing: room.entities[candidateEntity.id].facing,
                    size: room.entities[candidateEntity.id].size,
                    level: room.entities[candidateEntity.id].level,
                    score: room.entities[candidateEntity.id].score,
                    class: room.entities[candidateEntity.id].class,
                    color: room.ffa ? (room.entities[candidateEntity.id].team == room.clients[key].team ? 10 : room.entities[candidateEntity.id]
                        .color) : room.entities[candidateEntity.id].color,
                    showHealth: room.entities[candidateEntity.id].showHealth,
                    showName: room.entities[candidateEntity.id].showName,
                    barrels: barrels,
                    alpha: room.entities[candidateEntity.id].alpha,
                    vx: room.entities[candidateEntity.id].vx,
                    vy: room.entities[candidateEntity.id].vy,
                    health: room.entities[candidateEntity.id].godMode ? 1 : room.entities[candidateEntity.id].showHealth ? (room.entities[
                        candidateEntity.id].health / room.entities[candidateEntity.id].maxHealth) : 0,
                    barrelFlash: room.entities[candidateEntity.id].barrelFlash,
                    shieldFlash: room.entities[candidateEntity.id].shieldFlash,
                });
            };
        };
        room.clients[key].send(protocol.encode("entities", entities));
        room.clients[key].send(protocol.encode("camera", room.clients[key].camera.x, room.clients[key].camera.y, room.clients[key].camera.fov));
        room.clients[key].liveTime--;
        room.clients[key].warnings--;
        if (room.clients[key].warnings > 50) {
            if (room.clients[key].spawned) room.entities[room.clients[key].id].kill();
            room.clients[key].spawned = false;
            room.clients[key].close();
            console.log(prefix + "WARNING: Kicked a client for having more than 50 warnings.");
            delete room.clients[key];
        };
        if (room.clients[key].liveTime < 0) {
            if (room.clients[key].spawned) room.entities[room.clients[key].id].kill();
            room.clients[key].spawned = false;
            room.clients[key].close();
            console.log("A client disconnected for inactivity.");
            delete room.clients[key];
        };
    };
};

function broadcastRoom() {
    for (let key in room.clients) {
        room.clients[key].send(protocol.encode("roomInfo", room.width, room.height, room.gm, config.accountsEnabled));
        room.clients[key].send(protocol.encode("dominationColors", room.dominationColors));
    };
};

function broadcastMessage(m) {
    for (let key in room.clients) {
        room.clients[key].send(protocol.encode("message", m));
    };
};

function leaderboardLoop() {
    let tanks = [];
    for (let key in room.entities) {
        if (room.entities[key].showsOnLeaderboard) {
            let tank = room.entities[key];
            tanks.push({
                id: key,
                score: tank.score,
                name: tank.name,
                class: tank.class,
                color: tank.color,
            });
        };
    };
    tanks.sort(function(a, b) {
        return b.score - a.score;
    });
    let lb = [];
    for (let i = 0; i < (tanks.length > 10 ? 10 : tanks.length); i++) {
        lb.push(tanks[i]);
    };
    for (let key in room.clients) {
        room.clients[key].send(protocol.encode("lb", lb));
    };
};
function writeLoop() {
    if (config.accountsEnabled) {
        fs.writeFile("./db/accounts.json", JSON.stringify(accounts), function writeJSON(err) {
            if (err) return console.log(err);
        });
    };
    if (config.ipBanDatabaseEnabled) {
        fs.writeFile("./db/ipbans.json", JSON.stringify(ipBans), function writeJSON(err) {
            if (err) return console.log(err);
        });
    };
};
for (let i = 0; i < 0; i++) {
    let choose = 0;
    let alpha = false;
    let shape = new Entity((Math.random() * room.width) - room.width / 2, (Math.random() * room.height) - room.height / 2, "", idGenerator.generateId(), (40 + (
        choose * 15)) * (alpha ? 2 : 1), "tank", null, true);
    shape.team = -1;
    shape.define("Coin");
    shape.color = 12;
    shape.score = 22275;
    shape.showName = false;
    shape.facing = Math.random() * (Math.PI * 2);
    shape.maxHealth = (((choose + 1) * (choose + 1)) * 5) * (alpha ? 50 : 1);
    shape.health = (((choose + 1) * (choose + 1)) * 5) * (alpha ? 50 : 1);
    shape.value = (((choose + 1) * (choose + 1)) * 25) * (alpha ? 5 : 1);
};
for (let i = 0; i < 0; i++) {
    let x = 0;
    let y = 0;
    if (i == 0) {
        x = -room.width / 3;
    };
    if (i == 1) {
        x = room.width / 3;
    };
    if (i == 2) {
        y = room.height / 3;
    };
    if (i == 3) {
        y = -room.height / 3;
    };
    let dominator = new Entity(0, 0, "", idGenerator.generateId(), 50);
    dominator.scoreLock = 0;
    dominator.shooting = true;
    dominator.hasAI = true;
    dominator.x = x;
    dominator.y = y;
    dominator.define("Dominator")
    dominator.previousFrame.level = 1;
    dominator.skill.dmg = 8;
    dominator.skill.pen = 8;
    dominator.team = -1;
    dominator.color = 12;
    dominator.showName = false;
    dominator.resetsOnDeath = true;
    dominator.health = 25000;
    dominator.damage *= 10;
    dominator.maxHealth = 25000;
    dominator.onDeath = function() {
        dominator.ranOnDeath = false;
        let domDirection = (function(){
            switch(i) {
                case 0: return "LEFT"; break;
                case 1: return "RIGHT"; break;
                case 2: return "DOWN"; break;
                case 3: return "UP"; break;
            }
        })();
        let team = room.entities[dominator.lastHurtedEnemy].team == 0 ? "ORANGE" : "RED";
        let otherTeam = room.entities[dominator.lastHurtedEnemy].team == 0 ? "RED" : "ORANGE";
        if (dominator.team == -1) {
            dominator.team = room.entities[dominator.lastHurtedEnemy].team;
            dominator.color = room.entities[dominator.lastHurtedEnemy].color;
            broadcastMessage(team + " team has claimed the " + domDirection + " dominator");
        } else {
            broadcastMessage(team + " team is breaking the connection between " + otherTeam + " team and " + domDirection + " dominator");
            dominator.team = -1;
            dominator.color = 12;
        };
        room.dominationColors[i] = dominator.color;
        broadcastRoom();
    };
};
//setTimeout(()=>{room.restart()}, 15000);
setInterval(leaderboardLoop, 1000 / server.fps);
setInterval(gameLoop, 1000 / server.fps);
if (config.accountsEnabled || config.ipBanDatabaseEnabled) {
    setInterval(writeLoop, 1000 / 5);
};
//setInterval(function(){broadcastMessage("Test.")}, 2000);

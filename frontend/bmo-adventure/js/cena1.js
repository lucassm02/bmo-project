import { cena2 } from "./cena2.js";

var player;
var stars;
var bombs;
var platforms;
var cursors;
var pointer;
var touchX;
var touchY;
var score = 0;
var scoreText;

var cena1 = new Phaser.Scene("Cena 1");

cena1.preload = function() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("batery", "assets/batery.png");
  this.load.image("bomb", "assets/bomb.png");

  this.load.spritesheet("bmo", "assets/bmo.png", {
    frameWidth: 32,
    frameHeight: 48
  });
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  // d-pad
  this.load.spritesheet("esquerda", "assets/esquerda.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.spritesheet("direita", "assets/direita.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.spritesheet("cima", "assets/cima.png", {
    frameWidth: 64,
    frameHeight: 64
  });
};

cena1.create = function() {
  //  BG 
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, "ground")
    .setScale(2)
    .refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  player = this.physics.add.sprite(100, 450, "bmo");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("bmo", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [
      {
        key: "bmo",
        frame: 4
      }
    ],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("bmo", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

 
  cursors = this.input.keyboard.createCursorKeys();
  pointer = this.input.addPointer(1);

  stars = this.physics.add.group({
    key: "batery",
    repeat: 11,
    setXY: {
      x: 12,
      y: 0,
      stepX: 70
    }
  });

  stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000"
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(800 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive();

  // Ao clicar no botão de tela cheia
  button.on(
    "pointerup",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // Tecla "F" também ativa/desativa tela cheia
  var FKey = this.input.keyboard.addKey("F");
  FKey.on(
    "down",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // Controle direcional por toque na tela
  //
  // Para a esquerda: correr
  var esquerda = this.add
    .image(50, 500, "esquerda", 0)
    .setInteractive()
    .setScrollFactor(0);
  esquerda.on("pointerover", () => {
    esquerda.setFrame(1);
    player.setVelocityX(-160);
    player.anims.play("left", true);
  });
  esquerda.on("pointerout", () => {
    esquerda.setFrame(0);
    player.setVelocityX(0);
    player.anims.play("turn", true);
  });
  //
  // Para a direita: correr
  var direita = this.add
    .image(124, 500, "direita", 0)
    .setInteractive()
    .setScrollFactor(0);
  direita.on("pointerover", () => {
    direita.setFrame(1);
    player.setVelocityX(160);
    player.anims.play("right", true);
  });
  direita.on("pointerout", () => {
    direita.setFrame(0);
    player.setVelocityX(0);
    player.anims.play("turn", true);
  });
  //
  // Para cima: pular
  var cima = this.add
    .image(750, 500, "cima", 0)
    .setInteractive()
    .setScrollFactor(0);
  cima.on("pointerover", () => {
    cima.setFrame(1);
    if (player.body.touching.down) {
      player.setVelocityY(-330);
    }
  });
  cima.on("pointerout", () => {
    cima.setFrame(0);
  });
};

cena1.update = function() {};

function collectStar(player, batery) {
  batery.disableBody(true, true);

  //  Adiciona e atualiza score
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.scene.start(cena2);
}

export { cena1 };

import { TankClass } from "./TankClass.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { PowerUp , powerUpMode } from "./PowerUp.js";


const IdLabelKills = "#IdLabelKills"

class PlayerTankClass extends TankClass {
    ForwardKey;
    LeftKey;
    RightKey;
    BackwarkKey;
    ShootKey;
    
    Kills;

    NumberPlayer;

    constructor(Lives, NumberPlayer, ForwardKey, LeftKey, RightKey, BackwarkKey, ShootKey) {
        super(Lives);

        this.ForwardKey = ForwardKey;
        this.LeftKey = LeftKey;
        this.RightKey = RightKey;
        this.BackwarkKey = BackwarkKey;
        this.ShootKey = ShootKey;

        this.Kills = 0;
        this.NumberPlayer = NumberPlayer;
        this.updateLabelLives();
        
        this.setPowerUp(powerUpMode.INMUNIDAD);
    }


    setTankModel(TankModel, position, rotationY){
        super.setTankModel(TankModel, position, rotationY);
    }


    hasPressedKeys(keys) {
        var speedMultiplier = 1;
        if (this.PowerUpTaken == powerUpMode.VELOCIDAD)
            speedMultiplier = 1.7   

        this.forward = 0;
        
        if (!this.isStopped) {

            if (keys[this.LeftKey]) {
                this.InitialAngle = THREE.Math.radToDeg(this.TankModel.rotation.y);
                this.yaw = 150 * speedMultiplier;

                this.isStopped = true;                
            } 
            else if (keys[this.RightKey]) {
                this.InitialAngle = THREE.Math.radToDeg(this.TankModel.rotation.y);
                this.yaw = -150 * speedMultiplier;

                this.isStopped = true;
            }
            else if (keys[this.ForwardKey]) {
                this.forward = 20 * speedMultiplier;

            } 
            else if (keys[this.BackwarkKey]) {
                this.forward = -20 * speedMultiplier;
            }
            
            if (keys[this.ShootKey]) {
                    this.shoot();
            }

        }
    }

   
    addOneKill(){
        var aux = $(IdLabelKills);

        this.Kills += 1;

        $(IdLabelKills).text(this.Kills);
        
    }

    getKills(){
        return this.Kills;
    }

    updateLabelLives(){
        $("#IdLivesPlayer"+this.NumberPlayer).text(this.Lives);
    }

    resetPowerUp(){

        this.removePowerUpDiv();

        super.resetPowerUp();
    }

    removePowerUpDiv(){
        switch (this.PowerUpTaken) {
            case powerUpMode.DISPARO:
                $("#powerUpDañoPlayer"+this.NumberPlayer).addClass("ocultar");
                break;
            case powerUpMode.INMUNIDAD:
                $("#powerUpEscudoPlayer"+this.NumberPlayer).addClass("ocultar");
                break;
                    
            case powerUpMode.VELOCIDAD:
                $("#powerUpVelocidadPlayer"+this.NumberPlayer).addClass("ocultar");
                break;

            default:
                break;
        }
    }

    setPowerUp(Mode){
        if (this.PowerUpTaken != "")
            this.removePowerUpDiv()

        this.PowerUpTaken = Mode
        
        
            sonidoPowerUpUsar.play();

        switch (Mode) {
            case powerUpMode.DISPARO:
                this.TimePowerUp = 20;
                $("#powerUpDañoPlayer"+this.NumberPlayer).removeClass("ocultar");
                break;
            case powerUpMode.INMUNIDAD:
                this.TimePowerUp = 10;
                $("#powerUpEscudoPlayer"+this.NumberPlayer).removeClass("ocultar");
                break;
                    
            case powerUpMode.VELOCIDAD:
                this.TimePowerUp = 10;
                $("#powerUpVelocidadPlayer"+this.NumberPlayer).removeClass("ocultar");
                break;

            default:
                break;
        }
        

    }

};


export { PlayerTankClass };
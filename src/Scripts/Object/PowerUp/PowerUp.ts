import {PowerUpType} from "./PowerUpType"
import { object } from "prop-types";
import Runner from "../Runner";

export abstract class PowerUp{
    
    private m_type:PowerUpType;
    private m_duration:number;
    private m_currentDuration:number;

    get Duration()
    {
        return this.m_currentDuration;
    }
    

    get CurrentDuration()
    {
        return this.m_currentDuration;
    }
    
    set CurrentDuration(duration:number)
    {
        this.m_currentDuration = duration;
    }

    get Type()
    {
        return this.m_type;
    }

    constructor(
      duration: number,
      powerUpType: PowerUpType
    ) {
      
      this.m_type = powerUpType;
      this.m_duration = duration;
      
    }
  

    public abstract onAdded(runner:Runner):void;

    public abstract onRemoved(runner:Runner):void;
 
}

export class Grow extends PowerUp
{
        onAdded(runner:Runner):void
        {
            runner.setScale(2);
            runner.speed = 2;
            this.CurrentDuration = this.Duration;
        }


        onRemoved(runner:Runner):void
        {
            runner.setScale(1);
            runner.speed = 1;
            
        }
}


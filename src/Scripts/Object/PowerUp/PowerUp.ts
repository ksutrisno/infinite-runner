import {PowerUpType} from "./PowerUpType"
import { object } from "prop-types";
import Runner from "../Runner";

export abstract class PowerUp{
    
    private m_type:PowerUpType;
    private m_duration:number;

    get Duration()
    {
        return this.m_duration;
    }
    
    set Duration(duration:number)
    {
        this.m_duration = duration;
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
        }


        onRemoved(runner:Runner):void
        {
            runner.setScale(1);
        }
}


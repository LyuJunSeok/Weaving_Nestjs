import { MenuController } from './menu.controllers';
import { MenuService } from './menu.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        
    ],
    controllers: [
        MenuController, 
    ],
    providers: [
        MenuService,
    ],
})
export class MenuModule { }

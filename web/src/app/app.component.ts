import { Component, ViewChild, ElementRef } from '@angular/core';
import { BadgeGattService } from './badge-gatt.service';
import { displayWidth, displayHeight } from './badge-consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('preview') private canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('logo') private logoElement: ElementRef<HTMLImageElement>;

  public showLogo: boolean = true;
  public name: string = 'Uri Shaked';
  public connecting = false;

  constructor(private badgeGatt: BadgeGattService) {}

  async connect() {
    this.connecting = true;
    try {
      await this.badgeGatt.connect();
    } finally {
      this.connecting = false;
    }
    this.badgeGatt.updateDisplay(this.canvasCtx);
  }

  async disconnect() {
    this.badgeGatt.disconnect();
  }

  private get canvasCtx() {
    return this.canvas.nativeElement.getContext('2d');
  }

  get connected() {
    return this.badgeGatt.connected;
  }

  get batteryVoltage() {
    return this.badgeGatt.batteryVoltage;
  }

  drawName() {
    const outputCtx = this.canvasCtx;
    outputCtx.fillStyle = 'white';
    outputCtx.fillRect(0, 0, displayWidth, displayHeight);
    outputCtx.fillStyle = 'black';
    outputCtx.textAlign = 'center';
    outputCtx.font = '48px cursive';
    outputCtx.textBaseline = 'middle';
    const center = (this.showLogo ? 15 : 0) + displayWidth / 2;
    outputCtx.fillText(this.name, center, displayHeight / 2);
    if (this.showLogo) {
      outputCtx.drawImage(this.logoElement.nativeElement, 0, 0);
    }
    this.badgeGatt.updateDisplay(outputCtx);
  }
}
import BaseComponent from '@components/base-component';
import type { StateMachine } from '@state-machine/machine-class';
import type { MachinePayload, Option, PickerSector } from '@ts-types/index';
import easeInOutSine from '@utils/ease-in-out-sine';
import getRandom from '@utils/get-random';
import shuffle from '@utils/shuffle';

import * as styles from './picker-circle.module.scss';

const MIN_ROTATIONS = 5;
const MAX_ROTATIONS = 50;
const MIN_DURATION = 5000;
const MAX_DURATION = 100_000;

function calculateRotations(durationMs: number): number {
  const extraRotations =
    ((durationMs - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * (MAX_ROTATIONS - MIN_ROTATIONS);

  return MIN_ROTATIONS + extraRotations;
}

function getRandomLightColor(): string {
  return `rgb(${getRandom(150, 255)} ${getRandom(150, 255)} ${getRandom(150, 255)})`;
}
function getRandomDarkColor(): string {
  return `rgb(${getRandom(50, 150)} ${getRandom(50, 150)} ${getRandom(50, 150)})`;
}

export default class Circle extends BaseComponent<'canvas'> {
  private durationMs: number = 10_000;
  private lineColor: string = '';
  private centerColor: string = '';
  private circleUnfold: { title: string; color: string; angle: number }[] = [];
  private side: number = 0;
  private radius: number = 0;
  private centralCircleRadius: number = 0;
  private center: number = 0;
  private pickerList: Option[] = [];
  private sectors: PickerSector[] = [];
  private ctx: CanvasRenderingContext2D | null;
  private endPick: boolean = false;
  private terminated: boolean = false;
  private startTime: number = 0;
  private currentTitle: string = '';
  private currentAngle: number = 0;
  private totalAngle: number = 0;
  private randomOffset: number = 0;
  private rotations = MIN_ROTATIONS;

  constructor(
    private machine: StateMachine,
    private showTitleCallback: (title: string) => void
  ) {
    super({ elementTag: 'canvas', classes: [styles.circle] });

    this.ctx = this.getElement().getContext('2d');

    this.machine.on(this.machine.events.machineStateChanged, this.handleStateChange.bind(this));
  }

  private handleStateChange(payload: MachinePayload): void {
    const { trigger } = payload;
    if (trigger === 'navigatePicker') {
      this.terminated = false;
      this.setDimensions();
      this.setPersistentParameters();

      this.drawFrame(0);
    }

    if (trigger === 'changeDuration') {
      this.durationMs = this.machine.context.durationMs;
      this.rotations = calculateRotations(this.durationMs);
    }

    if (trigger === 'pick') {
      this.resetInitials();
      this.runAnimation();
    }

    if (trigger === 'navigateOptionsList' || trigger === 'navigateError') {
      this.terminated = true;
    }
  }

  private resetInitials(): void {
    this.currentTitle = this.circleUnfold[0].title;
    this.startTime = performance.now();
    this.randomOffset = Math.random() * 4 * Math.PI;
    this.totalAngle = this.rotations * 2 * Math.PI + this.randomOffset;
  }

  private setDimensions(): void {
    this.side = 490;
    this.radius = this.side / 2 - 30;
    this.centralCircleRadius = this.radius / 5;
    this.center = this.side / 2;

    const canvas = this.getElement();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.side * dpr;
    canvas.height = this.side * dpr;

    if (this.ctx) this.ctx.scale(dpr, dpr);
  }

  private setPersistentParameters(): void {
    this.pickerList = shuffle(this.machine.context.pickerList);
    this.lineColor = getRandomDarkColor();
    this.centerColor = getRandomDarkColor();
    this.sectors = [];
    this.circleUnfold = [];
    let totalWeight = 0;

    for (const option of this.pickerList) totalWeight += option.weight;

    const radianPerWeightPoint = (2 * Math.PI) / totalWeight;

    for (const option of this.pickerList) {
      this.sectors.push({
        ...option,
        angleRad: option.weight * radianPerWeightPoint,
        color: getRandomLightColor(),
      });
    }

    let fullIndex = 0;
    for (const option of this.sectors) {
      for (let index = 0; index < option.weight; index++) {
        fullIndex++;
        const { title, color } = option;
        this.circleUnfold.push({ title, color, angle: radianPerWeightPoint * fullIndex });
      }
    }
  }

  private runAnimation(): void {
    if (this.terminated) {
      this.terminated = false;
      return;
    }

    if (this.endPick) {
      this.endPick = false;
      this.machine.makeTransition(this.machine.value, 'endPick');
      return;
    }

    let progress = (performance.now() - this.startTime) / this.durationMs;
    if (progress > 1) progress = 1;

    const easedProgress = easeInOutSine(progress);
    this.currentAngle = easedProgress * this.totalAngle;

    this.drawFrame(this.currentAngle);

    this.showCurrentTitle();

    if (progress >= 1) this.endPick = true;

    requestAnimationFrame(this.runAnimation.bind(this));
  }

  private showCurrentTitle(): void {
    const normalizedAngle = this.currentAngle % (2 * Math.PI);
    const effectiveAngle = (2 * Math.PI - normalizedAngle) % (2 * Math.PI);

    let title = '';
    for (const weightPoint of this.circleUnfold) {
      if (effectiveAngle < weightPoint.angle) {
        title = weightPoint.title;
        break;
      }
    }

    if (!title && this.circleUnfold.length > 0) {
      title = this.circleUnfold[0].title;
    }

    this.currentTitle = title;
    this.showTitleCallback(this.currentTitle);
  }

  private drawWheel(initialAngle: number): void {
    if (this.ctx) {
      let startAngleRad = initialAngle;
      for (let index = 0; index < this.sectors.length; index++) {
        this.drawSector(this.sectors[index], startAngleRad);
        startAngleRad += this.sectors[index].angleRad;
      }
    }
  }

  private drawSector(sector: PickerSector, startAngleRad: number): void {
    if (this.ctx) {
      const endAngleRad = startAngleRad + sector.angleRad;

      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.fillStyle = sector.color;
      this.ctx.moveTo(this.center, this.center);
      this.ctx.arc(this.center, this.center, this.radius, startAngleRad, endAngleRad);
      this.ctx.lineTo(this.center, this.center);
      this.ctx.stroke();
      this.ctx.fill();

      this.drawOptionTitle(sector, startAngleRad);
      this.ctx.closePath();
    }
  }

  private drawOptionTitle(sector: PickerSector, startAngleRad: number): void {
    if (this.ctx) {
      this.ctx.save();

      this.ctx.translate(this.center, this.center);
      const midAngleRad = startAngleRad + sector.angleRad / 2;
      this.ctx.rotate(midAngleRad);

      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.fillStyle = 'black';

      let title: string;
      if (sector.title.length <= 16) {
        ({ title } = sector);
      } else {
        this.ctx.font = '16px sans-serif';
        title = `${sector.title.slice(0, 15)}...`;
      }

      const textCenterRadius =
        this.centralCircleRadius + (this.radius - this.centralCircleRadius) / 2;
      this.ctx.fillText(title, textCenterRadius, 0, this.radius - this.centralCircleRadius);
      this.ctx.restore();
    }
  }

  private drawCentralCircle(): void {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.side / 2, this.side / 2, this.centralCircleRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.centerColor;
      this.ctx.stroke();
      this.ctx.fill();
    }
  }

  private drawArrow(): void {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.fillStyle = 'coral';

      this.ctx.moveTo(this.side - 25, this.center);
      this.ctx.lineTo(this.side - 3, this.center - 5);
      this.ctx.lineTo(this.side - 3, this.center + 5);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
  }

  private drawFrame(angle: number): void {
    this.clearCanvas();
    this.drawWheel(angle);
    this.drawCentralCircle();
    this.drawArrow();
  }

  private clearCanvas(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.getElement().width, this.getElement().height);
    }
  }
}

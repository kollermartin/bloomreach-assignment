import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonType } from './button.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input<ButtonType>('primary');
  withoutSidePadding = input(false);
}

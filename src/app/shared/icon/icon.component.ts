import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconType } from './icon.type';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  type = input.required<IconType>();
  alt = input<string>('');
  size = input<number>(24);

  get iconPath(): string {
    const iconMap: Record<IconType, string> = {
      delete: 'assets/icons/delete_icon.png',
    };
    return iconMap[this.type()];
  }
}

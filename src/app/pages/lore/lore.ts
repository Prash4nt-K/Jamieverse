import { Component } from '@angular/core';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.html'
})
export class Lore {

  readonly memoryVaultItems = [
    '20241130_133738.jpg',
    '20241130_145540.jpg',
    '20241201_230126.jpg',
    '20241202_171524.jpg',
    '20241202_172825.jpg',
    '20241202_181158.jpg',
    '20241202_222513.jpg',
    '20250116_093956.jpg',
    '20250117_144137.jpg',
    '20250117_173331.jpg',
    '20250118_065307.jpg',
    '20250118_090223.jpg',
    '20250118_142419.jpg',
    '20250119_130338.jpg',
    '20250119_130649.jpg',
    '20250119_131023.jpg',
    '20250119_132011.jpg',
    '20250119_171404.jpg',
    '20250120_090500.jpg',
    '20250120_130044.jpg',
    '20250120_140309.jpg',
    '20250120_151302.jpg',
    '20250120_160804.jpg',
    '20250120_161052.jpg',
    '20250120_200952.jpg',
    '20250122_103206.jpg',
    '20250629_182127.jpg'
  ].map((fileName, index) => ({
    caption: `Memory ${String(index + 1).padStart(2, '0')}`,
    src: `/memory-vault/${fileName}`
  }));
}

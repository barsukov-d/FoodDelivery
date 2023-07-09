import { enableAutoUnmount } from '@vue/test-utils';
import { afterEach } from 'vitest';
import { config } from '@vue/test-utils';

// Включаем рендеринг слотов по умолчанию
config.global.renderStubDefaultSlot = true;

// Уничтожаем компонент после каждого теста
enableAutoUnmount(afterEach);

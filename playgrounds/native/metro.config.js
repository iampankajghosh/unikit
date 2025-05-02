import path from 'path';
import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  'component-native': path.resolve(__dirname, '../../packages/components-native'),
};

export default config;

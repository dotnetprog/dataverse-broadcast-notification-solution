import AppModule from './modules';

// Example runtime usage during build verification
if (typeof window !== 'undefined') {
	(window as any).broadcast = (window as any).broadcast ?? AppModule;
}

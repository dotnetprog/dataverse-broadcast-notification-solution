import AppModule from './modules';

// Example runtime usage during build verification
if (typeof window !== 'undefined') {
	// Ensure runtime enums used by forms (XrmEnum/FormType) exist. Type declarations
	// in `types/globals.d.ts` only provide types — this creates a small runtime
	// object so code that references `XrmEnum` doesn't throw during onload.
	const runtimeXrmEnum = (globalThis as any).XrmEnum ?? {
		FormType: {
			Undefined: 0,
			Create: 1,
			Update: 2,
			ReadOnly: 3,
			Disabled: 4,
			QuickCreate: 5,
			BulkEdit: 6,
			ReadOptimized: 11
		}
	};
	(globalThis as any).XrmEnum = runtimeXrmEnum;

	(window as any).broadcast = (window as any).broadcast ?? AppModule;
}

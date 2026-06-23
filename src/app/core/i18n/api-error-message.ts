import { TranslocoService } from '@ngneat/transloco';

export const translateApiError = (
    translocoService: TranslocoService,
    error: any
): string => {
    const validationErrors = error?.error?.validationErrors;
    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const translatedValidationErrors = validationErrors
            .map(validationError =>
                translateBackendCode(translocoService, validationError?.code)
            )
            .filter(Boolean);

        if (translatedValidationErrors.length > 0) {
            return translatedValidationErrors.join(' ');
        }
    }

    const code = error?.error?.code;
    const translatedCode = translateBackendCode(translocoService, code);
    if (translatedCode) {
        return translatedCode;
    }

    return (
        error?.error?.message ||
        translocoService.translate('errors.backend.GENERIC')
    );
};

const translateBackendCode = (
    translocoService: TranslocoService,
    code?: string
): string | null => {
    if (!code) {
        return null;
    }

    const key = `errors.backend.${code}`;
    const translated = translocoService.translate(key);
    return translated !== key ? translated : null;
};

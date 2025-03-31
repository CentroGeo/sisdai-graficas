import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

/**
 * Propiedades que configuran el eslint de este proyecto
 *
 * @property {Array} files Indica las extensiones de los archivos a los
 * que le aplicará el linteo.
 * @property {Array} ignores  Indica los archivos y/o directorios que
 * ignorará el linteo.
 * @property {Object} languageOptions El ecosistema de Javascript tiene
 * un variedad de tiempos de ejecución, versiones, extensiones y
 * frameworks. Cada uno de estos tiene un soporte distinto para la
 * sintaxis y las variables globales.
 *
 * - @property {string} languageOptions.ecmaVersion (default: "latest")
 * Indica la versión de ECMAScript que soporta. Puede indicarse con el
 * año (i.e., 2022) o la versiòn (i.e., 5). Eliga "latest" para utilizar
 * la versión compatible más reciente.
 * - @property {string} languageOptions.sourceType (default: "module")
 * Indica el tipo código fuente de Javascript. Las opciones válidas son:
 *  - "script": para archivos de script tradicionales
 *  - "module": para" ECMAScript modules (ESM) .js y .mjs
 *  - "commonjs": para archivos CommonJS .cjs
 * - @property {Object} languageOptions.globals Indica los objetos
 * adicionales que deben agregarse de manera global durante el linteo.
 * Por ejemplo:
 *
 * - Variables globales predefinidas. Eslint no proporciona conjuntos de
 * variables globales predefinidas, además de las variables globales con
 * el estándar ECMAScript que dependen de la version configurada. Puede
 * utilizar el 'globals' package para habilitar todos los globals para un
 * entorno específico.
 *
 * - Utilizando archivos de configuración. Para configurar variables globales
 * dentro de un archivo de configuración, indique la propiedad de
 * configuración en un objeto con el nombre clave para cada variable que
 * necesite. Para cada variable global clave, asigne el color
 * correspondiente igual a "writable" para permitir que la variable se
 * sobrescriba o "readonly" para deshabilitar la sobrescritura.
 *
 * @property {Object} plugins Indica los complementos disponibles para el
 * linteo de archivos. Los complementos pueden incluir:
 *
 * - Reglas personalizadas para validar si el código cumple cierta
 * expectativa y qué hacer si no.
 *
 * - Configuraciones personalizadas. Por favor revisa la documentación del
 * plugin para más detalles en cómo utilizar estas configuraciones.
 *
 * - Procesadores personalizados para extraer código Javscript desde otro
 * tipo de archivos o código de preprocesamiento antes del linteo.
 *
 * @property {Object} rules Indica las reglas que cumplen con la
 * expetativa del linteo. Pueden contener opciones de configuración
 * adicional, modificar las ya existentes o agregar más mediante plugins.
 * Para cambiar la exigencia de una regla se establece el id de la regla
 * mediante:
 *
 * - "off" o 0: desactiva la regla.
 * - "warn" o 1: activa la regla como advertencia
 * - "error" o 2: activarla regla como error.
 */
export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/node_modules',
      '**/package.json',
      '**/package-lock.json',
      '**/dist',
      'docs/.vitepress/dist',
      'docs/.vitepress/cache',
      '**/coverage',
      '**/libs',
      '**/deprecated',
    ],
  },

  {
    // @see https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    // @see https://eslint.org/docs/latest/rules/
    // @see https://eslint.org/docs/latest/use/configure/rules
    // @see https://eslint.vuejs.org/rules/multi-word-component-names.html
    rules: {
      'no-new': 0,
      eqeqeq: 'error',
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Layout', 'basico', 'default'],
        },
      ],
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  skipFormatting,
]

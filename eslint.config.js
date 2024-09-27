import pluginJs from '@eslint/js' // https://www.npmjs.com/package/@eslint/js
import pluginVue from 'eslint-plugin-vue' // https://eslint.vuejs.org/
import globals from 'globals' // https://www.npmjs.com/package/globals

import html from '@html-eslint/eslint-plugin' // https://html-eslint.org/
import eslintConfigPrettier from 'eslint-config-prettier' // https://github.com/vuejs/eslint-config-prettier

import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// Imita variables CommonJS; no es necesario si se usa CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

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
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  {
    ignores: [
      '**/node_modules',
      '**/package.json',
      '**/package-lock.json',
      '**/dist',
      'docs/.vuepress/dist',
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
      ecmaVersion: 'latest',
      sourceType: 'module', // script, module, commonjs
      globals: {
        ...globals.node, // node, browser
        globalThis: 'readonly',
      },
    },

    // @see https://eslint.org/docs/latest/use/configure/plugins
    plugins: {
      // @see https://html-eslint.org/
      '@html-eslint': html,
    },

    // @see https://eslint.org/docs/latest/rules/
    // @see https://eslint.org/docs/latest/use/configure/rules
    // @see https://eslint.vuejs.org/rules/multi-word-component-names.html
    rules: {
      // impide nuevos operadores fuera de asignaciones o comparaciones
      'no-new': 0,

      // requiere el uso de === y !==
      eqeqeq: 'error',

      'no-console': 'off',
      'no-debugger': 'off',
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // ignora los siguientes nombres
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Layout', 'basico', 'default'],
        },
      ],
    },
  },
  /**
   * Usando configuración predefinida para Javascript que habilita las
   * reglas que ESLint recomienda que todos utilicen para evitar posibles
   * errores.
   * @see https://www.npmjs.com/package/@eslint/js
   */
  pluginJs.configs.recommended,

  /**
   * Este complemento revisa el <template> y <script> de los archivos
   * .vue con ESLint, así como el código Vue en los archivos .js
   * - Encuentra errores de sintaxis
   * - Encuentra el uso incorrecto de las directivas de Vue.js
   * - Encuentra el incumplimiento de la guía de estilo de Vue.js
   * @see https://eslint.vuejs.org/
   */
  ...pluginVue.configs['flat/essential'],

  // Imita extensiones de estilo ESLintRC
  ...compat.extends(
    'plugin:prettier/recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ),
  // ...eslintPluginPrettier.configs['flat/recommended'],
  // eslintPluginPrettierRecommended,

  /**
   * Usando configuración de eslint para prettier. Tiene que ir al final.
   * @see https://github.com/vuejs/eslint-config-prettier
   * */
  eslintConfigPrettier,
]

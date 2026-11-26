const key='pingnet-rebuild-v1-mode';
export function getMode(){try{return localStorage.getItem(key)==='dark'?'dark':'light'}catch{return 'light'}}
export function saveMode(mode){try{localStorage.setItem(key,mode);return true}catch{return false}}
export function getTheme(){try{return localStorage.getItem('pingnet-rebuild-theme')||'cafe'}catch{return 'cafe'}}
export function saveTheme(theme){try{localStorage.setItem('pingnet-rebuild-theme',theme);return true}catch{return false}}

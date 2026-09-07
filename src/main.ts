import { mount } from 'svelte';
import App from './App.svelte';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import './app.css';

const target = document.getElementById('app');
if (!target) throw new Error('App mount target is missing.');
mount(App, { target });

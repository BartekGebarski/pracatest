<template>
    <div id="app">
        <app-header></app-header>
        <app-sequencer></app-sequencer>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>

import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';
import SequencerVue from './Sequencer.vue';

export default {
    name: 'App',
    components: {
       'app-header': HeaderVue,
       'app-footer': FooterVue,
       'app-sequencer': SequencerVue
    }
}
</script>

<style>
#app {
    background-color: #f2f2f2;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: 1px solid #ed1c24;
    box-shadow: 1px 1px 2px black;
    padding: 30px;
    margin: auto;
    position: fixed;
    top: 2%;
    left: 1%;
    bottom: 2%;
    right: 1%;
    overflow: auto;
}
</style>

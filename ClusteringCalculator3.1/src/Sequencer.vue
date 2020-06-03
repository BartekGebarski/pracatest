<!--<template>
    <div>
        <div class="box">
            <button
            v-for="sequencer in sequencers"
            :key="sequencer"
            :class="['button', {active: currentSequencer === sequencer}]"
            @click= "currentSequencer = sequencer">
            <strong>{{ sequencer }}</strong>
            </button>
        </div>
        <div class="box" v-if="currentSequencer != null">
            <h2><strong>{{ currentSequencer }} Clustering:</strong></h2>   
            <keep-alive>
                <component :is="currentSequencerComponent"></component>
            </keep-alive>         
        </div>
        
    </div>
</template>-->

<template>
<div>
    <tabs :options="{ useUrlFragment: false }">
        <tab  name="iSeq"  :to="{ name: 'iseq' }">
            <router-link :to="{ name: 'iseq' }"></router-link>
        </tab>
        <tab  name="MiSeq">
            <router-link :to="{ name: 'miseq' }"></router-link>
        </tab>
        <tab  name="NextSeq">
            <router-link :to="{ name: 'nextseq' }"></router-link>
        </tab>
        <tab  name="HiSeq">
            <router-link :to="{ name: 'hiseq' }"></router-link>
        </tab>
        <tab  name="NovaSeq">
            <router-link :to="{ name: 'novaseq' }"></router-link>
        </tab>
        <tab  name="NovaSeqXp">
            <router-link :to="{ name: 'novaseqxp' }"></router-link>
        </tab>
    </tabs>
</div>
</template>

<script>
//import ISeqVue from './components/ISeq.vue';
// import MiSeqVue from './components/MiSeq.vue';
// import NextSeqVue from './components/NextSeq.vue';
// import HiSeqVue from './components/HiSeq.vue';
// import NovaSeqVue from './components/NovaSeq.vue';
// import NovaSeqXpVue from './components/NovaSeqXp.vue';

export default {
    data() {
        return {
            // sequencers: ['iSeq', 'MiSeq', 'NextSeq', 'HiSeq', 'NovaSeq', 'NovaSeqXp'],
            // currentSequencer: 'iseq',
            // currentTab: null,
            // currentLaneMolarity: 18,
            // currentPhiXPercentage: 1,
            // currentPhiXStockConcentration: null,
            // currentLaneVolume: 1300,
            // currentMpConcentration: 2.5
        }
    },
    components: {
       //'app-iseq': ISeqVue,
      //  'app-miseq': MiSeqVue,
      //  'app-nextseq': NextSeqVue,
      //  'app-hiseq': HiSeqVue,
      //  'app-novaseq': NovaSeqVue,
      //  'app-novaseqxp': NovaSeqXpVue
    },
    methods: {
        tabClicked (selectedTab) {
            console.log('Current tab re-clicked:' + selectedTab.tab.name);
        },
        clicked(selectedTab) {
            this.currentSequencer = selectedTab.tab.name;
        },
     currentSequencerComponent: function() {
            return "app-" + this.currentSequencer.toLowerCase();
        }
    }
}
</script>

<style>
.box {
    background-color: #f2f2f2;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    border: 1px solid #ed1c24;
    box-shadow: 1px 1px 2px black;
    padding: 30px;
    margin: auto;
}

.formBox {
    text-anchor: middle;
    text-align: left;
    margin-left: 30%;
    margin-right: 30%;
}

.button {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    border: 1px solid #ed1c24;
    box-shadow: 1px 1px 2px black;
    padding: 10px;
    margin: auto;
    width: 15%;
    background-color: red;
    color: white;
}

button:hover {
    background-color: gray;
}

.button.active {
    background-color: #f44336;
    transform: translateY(1px);
}
.menu {
    text-align: center;
}

input[type="number"] {
    width: 3em;
}

.tabs-component {
  margin: 4em 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
  flex-grow: 1;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: red;
    color: white;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 4em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #f2f2f2;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 4em 2em;
  }
}
</style>
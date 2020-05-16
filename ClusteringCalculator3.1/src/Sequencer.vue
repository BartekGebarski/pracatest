<template>
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
</template>

<script>
import ISeqVue from './components/ISeq.vue';
import MiSeqVue from './components/MiSeq.vue';
import NextSeqVue from './components/NextSeq.vue';
import HiSeqVue from './components/HiSeq.vue';
import NovaSeqVue from './components/NovaSeq.vue';
import NovaSeqXpVue from './components/NovaSeqXp.vue';

export default {
    data() {
        return {
            sequencers: ['iSeq', 'MiSeq', 'NextSeq', 'HiSeq', 'NovaSeq', 'NovaSeq Xp'],
            currentSequencer: null,
            currentTab: null,
            currentLaneMolarity: 18,
            currentPhiXPercentage: 1,
            currentPhiXStockConcentration: null,
            currentLaneVolume: 1300,
            currentMpConcentration: 2.5
        }
    },
    components: {
       'app-iseq': ISeqVue,
       'app-miseq': MiSeqVue,
       'app-nextseq': NextSeqVue,
       'app-hiseq': HiSeqVue,
       'app-novaseq': NovaSeqVue,
       'app-novaseq xp': NovaSeqXpVue
    },
    computed: {
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
</style>
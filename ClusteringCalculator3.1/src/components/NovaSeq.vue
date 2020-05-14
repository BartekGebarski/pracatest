<template>
    <div class="box">
        <div class="formBox">
            <label for="Flowcell">Choose the Flowcell type:</label>
            <label for="Flowcell"><input type="radio" value="S1" v-model="flowcell">SP/S1</label>
            <label for="Flowcell"><input type="radio" value="S2" v-model="flowcell">S2</label>
            <label for="Flowcell"><input type="radio" value="S4" v-model="flowcell">S4</label><br>
            <hr>
            <label for="laneMolarity">Concentration of the multiplex:</label>
                <input type="number" v-model="multiplexConcentration">nM<br>
                <hr>
            <label for="LoadingVolume">Loading Volume:</label>
                <input type="number" disabled="disabled" v-model="flowcells[this.flowcell].volume">µl<br>
                <hr>
            <label for="laneMolarity">Enter lane molarity:</label>
                <input type="number" v-model="laneMolarity">pM<br>
                <hr>
            <label for="phiXPercentage">Enter PhiX percentage of the lane:</label>
                <input type="number" v-model="phiXPercentage">%<br>
                <hr>
            <label for="phiXPercentage">Enter PhiX Stock molarity (<strong>non-denatured</strong>):</label>
                <label for="phiXPercentage"><input type="radio" value="1" v-model="phiXStockConcentration">1nM</label>
                <label for="phiXPercentage"><input type="radio" value="0.1" v-model="phiXStockConcentration">0.1nM</label>
                <hr>
            <div class="generalparameters">
                Total Lane Molarity: {{ laneMolarity }}pM<br>
                Library Molarity: {{ calculateLibraryMolarity() }}pM<br>
                PhiX Molarity: {{ calculatePhiXMolarity() }}pM<br>
            </div>
        </div>
        
        <h3>Instruction:</h3>
        <pre id="instruction">
        1. Check, if instrument is idle. If run just finished - press 'Home' button and prepare new run.
        2. Plan ahead every run, reagents can be thawn over night in cold room or in water for 2-4h.
            After thawing in cold room it is important to check if everything was thawn.
        3. Prepare Cluster Sheet, Sample and all reagents.
        4. Take out the flowcell from the fridge to equilibrate it to room temperature (5-10min).
        5. Denature the sample:
            - Transfer {{ calculateBufferVolume() }}µl of buffer into Eppendorf tube;
            - Add {{ calculateLibraryVolume() }}µl of {{ multiplexConcentration }}nM library;
            - Add {{ calculatePhiXVolume() }}µl of {{ phiXStockConcentration }}nM PhiX;
            - Add {{ calculateNaOHVolume() }} of 0,2N NaOH;
            - Incubate for 8 minutes;
            - Neutralize by adding {{ calculateTrisVolume() }} of 400mM Tris;
        6. Load the final mix in the tube and put in the well labeled sample.
        7. Follow the screen instructions and load all consumables in instrument.
        8. If neccessary delete old files using software manager.
        9. To perform maintanance wash use wash cartridges and wash Flowcell.
            Follow instructions on the screen to start wash.
        </pre>
    </div>

    
</template>

<script>
export default {
     data() {
         return {
            multiplexConcentration: 2.5,
            laneMolarity: 100,
            phiXPercentage: 1,
            phiXStockConcentration: 1,
            flowcell: 'S1',
            flowcells: {
                S1: {
                    volume: 100
                },
                S2: {
                    volume: 150
                },
                S4: {
                    volume: 310
                }
            }
         }
     },
     methods: {
         calculatePhiXMolarity() {            
            return (this.laneMolarity / 100 * this.phiXPercentage).toFixed(2);
        },
        calculateLibraryMolarity() {            
            return (this.laneMolarity - this.calculatePhiXMolarity()).toFixed(2);
        },
        calculateLibraryVolume() {    
            return (this.flowcells[this.flowcell].volume / (this.multiplexConcentration / (this.laneMolarity * 5 / 1000))).toFixed(2);
        },
        calculatePhiXVolume() {
                return (this.flowcells[this.flowcell].volume / (this.phiXStockConcentration / (this.phiXPercentage * 5 / 1000) / (this.laneMolarity / 100))).toFixed(2);
        },
        calculateBufferVolume() {
                return (this.flowcells[this.flowcell].volume - this.calculatePhiXVolume() - this.calculateLibraryVolume()).toFixed(2);
        },
        calculateNaOHVolume() {
            return this.flowcells[this.flowcell].volume / 4 + 'µl';
        },
        calculateTrisVolume() {
            return this.flowcells[this.flowcell].volume / 4 + 'µl';
        }
    }
}
</script>

<style scoped>
#instruction {
    text-align: left;
    user-select: all;
    font-size: larger;
    margin-left: 0em;
    user-select: all;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.generalparameters {
     border: 1px solid darkgray;
    box-shadow: 1px 1px 2px black;
    user-select: all;
    background-color: lightgray;
}
</style>
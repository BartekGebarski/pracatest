<template>
<div class="box">
    <div class="formBox">
        <label for="laneMolarity">Enter lane molarity:</label>
        <input type="number" v-model="laneMolarity">pM<br>
        <hr>
    <label for="phiXPercentage">Enter PhiX percentage of the lane:</label>
        <input type="number" v-model="phiXPercentage">%<br>
        <hr>
        <label for="phiXPercentage">Enter PhiX Stock molarity:</label>
        <label for="phiXPercentage"><input type="radio" value="200" v-model="phiXStockConcentration">200pM</label>
        <label for="phiXPercentage"><input type="radio" value="20" v-model="phiXStockConcentration">20pM</label>
        <hr>
        <div class="generalparameters">
                Total Lane Molarity: {{ laneMolarity }}pM<br>
                Library Molarity: {{ calculateLibraryMolarity() }}pM<br>
                PhiX Molarity: {{ calculatePhiXMolarity() }}pM<br>
        </div>
    </div>    
        <h3>Instruction:</h3>              
    <pre id="instruction">
1. Check, if instrument is idle. If run just finished - remove used cartridge and start washing.
2. After washing power-cycle the instrument (washing takes around 20min).
3. Prepare Cluster Sheet, Sample Sheet (on instrument), Sample and all reagents.
4. Denature the sample:
    - Transfer 19µl of the 2,5nM library into PCR tube;
    - Add 1µl of 2N NaOH;
    - Incubate for 5 minutes;
    - Transfer denatured sample into Eppendorf tube containing 980µl of Hyb Buffer;
    - Denatured sample can be stored in -20C for 4-6 weeks;
5. Prepare final dilution:
    - Transfer {{ calculateBufferVolume() }}µl of Hyb buffer to the Eppendorf tube;
    - Add {{ calculateLibraryVolume() }}µl of denatured sample;
    - Add {{ calculatePhiXVolume() }}µl of {{ phiXStockConcentration }}pM PhiX;
6. Load the final mix in well labeled sample.
7. Follow the screen instructions and load all consumables in instrument.
8. After finished run wash and powercycle the instrument.
    </pre>
</div>
</template>

<script>
export default {
    data() {
        return {
            multiplexConcentration: 2.5,
            laneMolarity: 18,
            laneVolume: 0.6,
            phiXPercentage: 5,
            phiXStockConcentration: 200,
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
            return ((1000 / 50 * this.calculateLibraryMolarity()) * this.laneVolume).toFixed(2);
        },
        calculatePhiXVolume() {
            return ((1000 / this.phiXStockConcentration * this.calculatePhiXMolarity()) * this.laneVolume).toFixed(2);
        },
        calculateBufferVolume() {
            return ((1000 * this.laneVolume) - this.calculatePhiXVolume() - this.calculateLibraryVolume()).toFixed(2);
            
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
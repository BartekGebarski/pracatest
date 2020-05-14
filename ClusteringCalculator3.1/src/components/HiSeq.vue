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
1. Check, if instrument is idle. If run just finieshed power-cycle the instrument,
   perform maintanance wash using MWS. Delete old files from HiSeq Temp folder on drives C and D. 
   Leave just 3 latest runs. Afterwards perform water wash.
   Wash cBot as well. (Follow instructions on the screen)
2. Prepare Cluster Sheet and all reagents.
3. Denature the sample:
    - Transfer 19µl of the 2,5nM library into PCR tube;
    - Add 1µl of 2N NaOH;
    - Incubate for 5 minutes;
    - Transfer denatured sample into Eppendorf tube containing 980µl of Hyb Buffer;
    - Denatured sample can be stored in -20C for 4-6 weeks;
4. Prepare final dilution:
    - Transfer {{ calculateBufferVolume() }}µl of Hyb buffer to PCR tube;
    - Add {{ calculateLibraryVolume() }}µl of denatured sample;
    - Add {{ calculatePhiXVolume() }}µl of {{ phiXStockConcentration }}pM PhiX;
5. Load the Flowcell and all consumables in cBot (Clustering takes 2-2,5h).
6. 10-15 minutes before clustering is finished prime HiSeq with reagents.
7. Lead clustered Flowcell in the HiSeq.
8. After finifshed run power-cycle and wash the instrument,
    delete old files.</pre>
</div>
</template>

<script>
export default {
     data() {
        return {
            multiplexConcentration: 2.5,
            laneMolarity: 18,
            laneVolume: 0.12,
            phiXPercentage: 1,
            phiXStockConcentration: 20
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
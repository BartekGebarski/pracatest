<template>
<div class="box">    
    <div class="formBox">
        <label for="laneMolarity">Concentration of the multiplex:</label>
        <input type="number" v-model="multiplexConcentration">nM<br>
        <hr>
        <label for="phiXPercentage">Loading Volume:</label>
            <input type="number" v-model="laneVolume">µl<br>
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
            Library Molarity: {{ calculateLibraryMolarity }}pM<br>
            PhiX Molarity: {{ calculatePhiXMolarity }}pM<br>
        </div>
    </div>
    <h3>Instruction:</h3>
    <pre id="instruction">
1. Check, if instrument is idle. If run just finished - remove used cartridge (follow instructions on the screen).
2. Prepare Cluster Sheet, Sample and all reagents.
3. Take out the flowcell from the fridge to equilibrate it to room temperature (5-10min).
4. Install Flowcell in the cartridge.
5. Mix all reagents in the Eppendorf tube: 
    - {{ calculatePhiXVolume }}µl of {{ phiXStockConcentration }} nM PhiX;
    - {{ calculateLibraryVolume }}µl of {{ multiplexConcentration }} nM Library;
    - {{ calculateBufferVolume }}µl of Dilution Buffer;
6. Vortex and spin down.
7. Transfer 20µl into iSeq cartridge in well marked 'sample'.
8. Load reagents into instrument, following instructions on the iSeq's screen.</pre>
</div>
</template>

<script>
export default {
    data() {
        return {
            multiplexConcentration: 2.5,
            laneMolarity: 50,
            laneVolume: 20,
            phiXPercentage: 1,
            phiXStockConcentration: 0.1,
            table: {
                'Sample:': '',
                'PhiX Volume:': '',
                'Buffer Volume:': ''
            }
        }
    },
    computed: {
        calculatePhiXMolarity() {            
            return (this.laneMolarity / 100 * this.phiXPercentage).toFixed(2);
        },
        calculateLibraryMolarity() {            
            return (this.laneMolarity - this.calculatePhiXMolarity).toFixed(2);
        },
        calculateLibraryVolume() {    
            return (this.laneVolume / ((this.multiplexConcentration / this.calculateLibraryMolarity) * 1000)).toFixed(2);                      
        },
        calculatePhiXVolume() {
            return (this.laneVolume / (this.phiXStockConcentration / (this.phiXPercentage * 5 / 1000) / (this.laneMolarity / 100))).toFixed(2);           
        },
        calculateBufferVolume() {
            return (this.laneVolume - this.calculatePhiXVolume - this.calculateLibraryVolume).toFixed(2);
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
</style>
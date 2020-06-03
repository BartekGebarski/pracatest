import iseq from './components/ISeq.vue';
import miseq from './components/MiSeq.vue';
import nextseq from './components/NextSeq.vue';
import hiseq from './components/HiSeq.vue';
import novaseq from './components/NovaSeq.vue';
import novaseqxp from './components/NovaSeqXp.vue';

export const routes = [
    { path: '/iseq', name: 'iseq', component: iseq },
    { path: '/miseq', name: 'miseq',component: miseq },
    { path: '/nextseq', name: 'nextseq',component: nextseq },
    { path: '/hiseq', name: 'hiseq',component: hiseq },
    { path: '/novaseq', name: 'novaseq',component: novaseq },
    { path: '/novaseqxp', name: 'novaseqxp',component: novaseqxp }
];
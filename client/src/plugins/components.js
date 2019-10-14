import Vue from 'vue';
import Offset from '@/components/helper/Offset';
import Card from '@/components/material/Card';
import ChartCard from '@/components/material/ChartCard';
import Notification from '@/components/material/Notification';
import StatsCard from '@/components/material/StatsCard';

import ParametrosExame from '@/components/helper/ParametrosExame';
import Snackbar from '@/components/helper/Snackbar';

import Batalhoes from '@/components/material/Batalhoes';
import Escalas from '@/components/material/Escalas';
import Exames from '@/components/material/Exames';
import Hierarquia from '@/components/material/Hierarquia';
import Pessoa from '@/components/material/Pessoas';
import Setores from '@/components/material/Setores';

Vue.component('obm' , Batalhoes);
Vue.component('escalas' , Escalas);
Vue.component('exames', Exames);
Vue.component('hierarquia' , Hierarquia);
Vue.component('pessoa', Pessoa);
Vue.component('setores', Setores);

Vue.component('parametros-exame-dialog', ParametrosExame);
Vue.component('snackbar', Snackbar);

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);
Vue.component(ChartCard.name, ChartCard);
Vue.component(Notification.name, Notification);
Vue.component(StatsCard.name, StatsCard);

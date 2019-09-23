import Vue from 'vue';
import Offset from '@/components/helper/Offset';
import Card from '@/components/material/Card';
import ChartCard from '@/components/material/ChartCard';
import Notification from '@/components/material/Notification';
import StatsCard from '@/components/material/StatsCard';

import ParametrosExame from '@/components/helper/ParametrosExame';
import ValorReferenciaParametro from '@/components/helper/ValoresReferencia';
import Snackbar from '@/components/helper/Snackbar';

Vue.component('parametros-exame-dialog', ParametrosExame);
Vue.component('valores-referencia-parametro-dialog', ValorReferenciaParametro);
Vue.component('snackbar', Snackbar);

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);
Vue.component(ChartCard.name, ChartCard);
Vue.component(Notification.name, Notification);
Vue.component(StatsCard.name, StatsCard);

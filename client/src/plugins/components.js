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
import NovaPessoa from '@/components/material/NovaPessoa';
import EditPessoa from '@/components/material/EditPessoa';
import Setores from '@/components/material/Setores';

import ImportarResultadosExames from '@/components/material/ImportarResultadosExames';

import NovoResultadoExames from '@/components/material/NovoResultadoExames';
import TabelaResultadoExameParametros from '@/components/material/TabelaResultadoExameParametros';

Vue.component('importar-resultados-exames', ImportarResultadosExames);
Vue.component('tabela-resultado-exame-parametros', TabelaResultadoExameParametros);
Vue.component('novo-resultado-exame', NovoResultadoExames);
Vue.component('obm' , Batalhoes);
Vue.component('escalas' , Escalas);
Vue.component('exames', Exames);
Vue.component('hierarquia' , Hierarquia);
Vue.component('pessoa', Pessoa);
Vue.component('nova-pessoa', NovaPessoa);
Vue.component('editar-pessoa', EditPessoa);
Vue.component('setores', Setores);
Vue.component('parametros-exame-dialog', ParametrosExame);
Vue.component('snackbar', Snackbar);

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);
Vue.component(ChartCard.name, ChartCard);
Vue.component(Notification.name, Notification);
Vue.component(StatsCard.name, StatsCard);

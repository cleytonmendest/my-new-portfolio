import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { TableOfContents } from '@/components/legal/table-of-contents';

export const metadata: Metadata = {
  title: 'Termos de Uso - MendoHub',
  description:
    'Termos de Uso do MendoHub - Condições gerais de uso da plataforma de automação de atendimento via WhatsApp.',
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = '09 de janeiro de 2026';

const tocItems = [
  { id: 'aceitacao', title: '1. Aceitação dos Termos', level: 2 },
  { id: 'descricao', title: '2. Descrição do Serviço', level: 2 },
  { id: 'elegibilidade', title: '3. Elegibilidade', level: 2 },
  { id: 'cadastro', title: '4. Cadastro e Conta', level: 2 },
  { id: 'uso-permitido', title: '5. Uso Permitido', level: 2 },
  { id: 'uso-proibido', title: '6. Uso Proibido', level: 2 },
  { id: 'propriedade', title: '7. Propriedade Intelectual', level: 2 },
  {
    id: 'responsabilidades-cliente',
    title: '8. Responsabilidades do Cliente',
    level: 2,
  },
  {
    id: 'limitacao-responsabilidade',
    title: '9. Limitação de Responsabilidade',
    level: 2,
  },
  { id: 'disponibilidade', title: '10. Disponibilidade do Serviço', level: 2 },
  { id: 'pagamento', title: '11. Pagamento e Cobrança', level: 2 },
  { id: 'cancelamento', title: '12. Cancelamento e Suspensão', level: 2 },
  { id: 'modificacoes', title: '13. Modificações nos Termos', level: 2 },
  { id: 'rescisao', title: '14. Rescisão', level: 2 },
  { id: 'indenizacao', title: '15. Indenização', level: 2 },
  { id: 'lei-aplicavel', title: '16. Lei Aplicável', level: 2 },
  { id: 'resolucao-disputas', title: '17. Resolução de Disputas', level: 2 },
  { id: 'disposicoes-gerais', title: '18. Disposições Gerais', level: 2 },
  { id: 'contato', title: '19. Contato e Suporte', level: 2 },
];

export default function TermosUsoPage() {
  return (
    <LegalLayout
      title="Termos de Uso"
      lastUpdated={lastUpdated}
      otherPageTitle="Política de Privacidade"
      otherPageHref="/whatsapp-bot/politica-de-privacidade"
      tableOfContents={<TableOfContents items={tocItems} />}
    >

      <section id="aceitacao" className="scroll-mt-20">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Bem-vindo aos Termos de Uso do <strong>MendoHub</strong>, operado
          por <strong>Cleyton Mendes</strong>.
        </p>
        <p>
          Ao se cadastrar, acessar ou utilizar a plataforma MendoHub, você
          (doravante denominado "Cliente" ou "você") concorda expressamente em
          se vincular a estes Termos de Uso, à nossa Política de Privacidade e
          a todas as leis e regulamentos aplicáveis.
        </p>
        <p>
          Se você não concorda com estes termos, não utilize nossos serviços.
        </p>
        <p>
          <strong>Importante:</strong> Ao criar uma conta e utilizar o
          MendoHub, você declara ter lido, compreendido e aceito integralmente
          estes Termos de Uso.
        </p>
      </section>

      <section id="descricao" className="scroll-mt-20">
        <h2>2. Descrição do Serviço</h2>
        <p>
          O <strong>MendoHub</strong> é uma plataforma SaaS (Software as a
          Service) de automação de atendimento ao cliente via WhatsApp que
          oferece:
        </p>
        <ul>
          <li>
            <strong>Integração com WhatsApp Business API:</strong> Conexão com
            a API oficial do WhatsApp Business fornecida pela Meta Platforms,
            Inc.
          </li>
          <li>
            <strong>Automação inteligente:</strong> Respostas automatizadas
            utilizando inteligência artificial (Claude AI da Anthropic) para
            análise de contexto e geração de mensagens.
          </li>
          <li>
            <strong>Roteamento de conversas:</strong> Direcionamento automático
            de mensagens entre chatbot e atendentes humanos conforme regras
            configuradas.
          </li>
          <li>
            <strong>Histórico de conversas:</strong> Armazenamento e acesso ao
            histórico completo de interações com clientes finais.
          </li>
          <li>
            <strong>Integrações:</strong> Conexão com sistemas de CRM, ERP e
            outras ferramentas via webhooks e APIs.
          </li>
          <li>
            <strong>Dashboard de gerenciamento:</strong> Interface web para
            configuração, monitoramento e análise de conversas.
          </li>
          <li>
            <strong>Relatórios e análises:</strong> Métricas de desempenho,
            volume de mensagens, tempo de resposta e satisfação do cliente.
          </li>
        </ul>
        <p>
          O serviço é fornecido em modelo multi-tenant, onde múltiplos clientes
          compartilham a infraestrutura mas têm seus dados completamente
          isolados.
        </p>
      </section>

      <section id="elegibilidade" className="scroll-mt-20">
        <h2>3. Elegibilidade</h2>
        <p>Para utilizar o MendoHub, você deve:</p>
        <ul>
          <li>
            <strong>Ser pessoa jurídica:</strong> Possuir CNPJ ativo e estar em
            situação regular perante os órgãos competentes.
          </li>
          <li>
            <strong>Ter maioridade:</strong> Se pessoa física representando
            empresa, ter pelo menos 18 (dezoito) anos de idade.
          </li>
          <li>
            <strong>Ter conta WhatsApp Business aprovada:</strong> Possuir um
            número de telefone verificado na plataforma Meta Business e aprovado
            para uso da WhatsApp Business API.
          </li>
          <li>
            <strong>Aceitar os termos da Meta:</strong> Estar em conformidade
            com os Termos de Serviço do WhatsApp Business API, Políticas de
            Comércio e Políticas da Plataforma Meta.
          </li>
          <li>
            <strong>Fornecer informações verdadeiras:</strong> Prestar
            informações corretas, completas e atualizadas durante o cadastro.
          </li>
        </ul>
        <p>
          Reservamos o direito de recusar ou cancelar contas que não atendam a
          estes requisitos a qualquer momento.
        </p>
      </section>

      <section id="cadastro" className="scroll-mt-20">
        <h2>4. Cadastro e Conta</h2>
        <p>
          Para utilizar o MendoHub, você deve criar uma conta fornecendo as
          seguintes informações:
        </p>
        <ul>
          <li>Nome completo ou razão social</li>
          <li>CNPJ (para pessoa jurídica)</li>
          <li>Email corporativo</li>
          <li>Telefone de contato</li>
          <li>Endereço comercial</li>
          <li>Credenciais da WhatsApp Business API</li>
        </ul>
        <p>
          <strong>Segurança da conta:</strong>
        </p>
        <ul>
          <li>
            Você é responsável por manter a confidencialidade de suas
            credenciais de acesso (email e senha).
          </li>
          <li>
            Recomendamos fortemente a ativação de autenticação multifator (MFA)
            para proteção adicional.
          </li>
          <li>
            Notifique-nos imediatamente em caso de uso não autorizado de sua
            conta.
          </li>
          <li>
            Você é responsável por todas as atividades realizadas através de sua
            conta.
          </li>
        </ul>
        <p>
          <strong>Veracidade das informações:</strong> Você declara que todas
          as informações fornecidas são verdadeiras, completas e atualizadas. É
          sua responsabilidade manter os dados cadastrais atualizados.
        </p>
      </section>

      <section id="uso-permitido" className="scroll-mt-20">
        <h2>5. Uso Permitido</h2>
        <p>O MendoHub pode ser utilizado para as seguintes finalidades lícitas:</p>
        <ul>
          <li>
            <strong>Atendimento ao cliente:</strong> Responder dúvidas, fornecer
            suporte e resolver problemas de clientes.
          </li>
          <li>
            <strong>Vendas e pré-vendas:</strong> Qualificação de leads,
            apresentação de produtos e serviços, envio de propostas.
          </li>
          <li>
            <strong>Notificações transacionais:</strong> Confirmações de pedidos,
            atualizações de status, lembretes de pagamento.
          </li>
          <li>
            <strong>Pesquisas de satisfação:</strong> Coleta de feedback e NPS
            (Net Promoter Score).
          </li>
          <li>
            <strong>Agendamentos:</strong> Marcação de consultas, reuniões ou
            serviços.
          </li>
          <li>
            <strong>Recuperação de carrinho abandonado:</strong> Lembretes sobre
            produtos deixados no carrinho (com opt-in prévio).
          </li>
        </ul>
        <p>
          <strong>Condições:</strong> Todo uso deve estar em conformidade com as
          Políticas da Meta/WhatsApp, LGPD, Código de Defesa do Consumidor e
          legislação brasileira aplicável.
        </p>
      </section>

      <section id="uso-proibido" className="scroll-mt-20">
        <h2>6. Uso Proibido</h2>
        <p>
          É <strong>estritamente proibido</strong> utilizar o MendoHub para:
        </p>
        <ul>
          <li>
            <strong>Spam e mensagens não solicitadas:</strong> Envio massivo de
            mensagens promocionais sem consentimento prévio e explícito do
            destinatário.
          </li>
          <li>
            <strong>Conteúdo ilegal:</strong> Compartilhamento de material que
            viole leis brasileiras (pornografia, drogas, armas, falsificação,
            etc.).
          </li>
          <li>
            <strong>Fraude e engano:</strong> Práticas enganosas, phishing,
            golpes financeiros ou falsidade ideológica.
          </li>
          <li>
            <strong>Violação de propriedade intelectual:</strong> Compartilhamento
            de conteúdo protegido por direitos autorais sem autorização.
          </li>
          <li>
            <strong>Discurso de ódio:</strong> Mensagens discriminatórias,
            racistas, xenofóbicas ou que promovam violência.
          </li>
          <li>
            <strong>Assédio:</strong> Perseguição, ameaças ou intimidação de
            indivíduos.
          </li>
          <li>
            <strong>Manipulação de sistema:</strong> Tentativas de burlar
            limitações, realizar engenharia reversa ou comprometer a segurança da
            plataforma.
          </li>
          <li>
            <strong>Revenda não autorizada:</strong> Sublicenciamento do serviço
            sem autorização expressa.
          </li>
          <li>
            <strong>Uso excessivo:</strong> Consumo abusivo de recursos que
            prejudique outros usuários (ex: envio de milhões de mensagens em
            curto período).
          </li>
          <li>
            <strong>Violação das políticas da Meta:</strong> Qualquer atividade
            que viole os Termos de Serviço do WhatsApp Business, Políticas de
            Comércio ou Políticas da Plataforma Meta.
          </li>
        </ul>
        <p>
          <strong>Consequências:</strong> O descumprimento destas proibições
          resultará em suspensão imediata da conta, cancelamento do serviço sem
          reembolso e possível ação legal.
        </p>
      </section>

      <section id="propriedade" className="scroll-mt-20">
        <h2>7. Propriedade Intelectual</h2>
        <p>
          <strong>Nossos direitos:</strong>
        </p>
        <ul>
          <li>
            O MendoHub, incluindo código-fonte, design, interface, marca,
            logotipos e documentação, é propriedade exclusiva de Cleyton Mendes e
            está protegido por leis de direitos autorais e propriedade intelectual.
          </li>
          <li>
            Você recebe uma licença limitada, não exclusiva, intransferível e
            revogável para utilizar a plataforma conforme estes termos.
          </li>
          <li>
            É proibido copiar, modificar, distribuir, vender ou criar obras
            derivadas da plataforma sem autorização expressa.
          </li>
        </ul>
        <p>
          <strong>Seus direitos:</strong>
        </p>
        <ul>
          <li>
            Você mantém todos os direitos sobre o conteúdo que você cria e
            compartilha através do MendoHub (mensagens, templates, scripts,
            integrações personalizadas).
          </li>
          <li>
            Ao utilizar a plataforma, você nos concede uma licença limitada para
            processar, armazenar e transmitir seu conteúdo apenas na medida
            necessária para fornecer o serviço.
          </li>
        </ul>
        <p>
          <strong>Feedback e sugestões:</strong> Se você enviar sugestões,
          ideias ou feedback sobre melhorias, concede-nos o direito de utilizá-los
          sem compensação ou atribuição.
        </p>
      </section>

      <section id="responsabilidades-cliente" className="scroll-mt-20">
        <h2>8. Responsabilidades do Cliente</h2>
        <p>Ao utilizar o MendoHub, você se compromete a:</p>
        <ul>
          <li>
            <strong>Manter dados atualizados:</strong> Garantir que informações
            cadastrais e configurações estejam corretas.
          </li>
          <li>
            <strong>Obter consentimentos necessários:</strong> Assegurar que
            possui autorização legal para entrar em contato com seus clientes via
            WhatsApp conforme LGPD e regulamentações aplicáveis.
          </li>
          <li>
            <strong>Respeitar opt-out:</strong> Cessar imediatamente o envio de
            mensagens quando um usuário solicitar descadastramento.
          </li>
          <li>
            <strong>Supervisionar conteúdo automatizado:</strong> Revisar e
            aprovar templates de mensagens automáticas, garantindo que estejam em
            conformidade com leis e políticas.
          </li>
          <li>
            <strong>Proteger credenciais:</strong> Manter senhas e tokens de API
            seguros e não compartilhá-los.
          </li>
          <li>
            <strong>Monitorar uso:</strong> Acompanhar o volume de mensagens e
            comportamento da conta para evitar abusos.
          </li>
          <li>
            <strong>Reportar problemas:</strong> Notificar-nos sobre bugs,
            vulnerabilidades de segurança ou uso indevido.
          </li>
          <li>
            <strong>Cumprir políticas da Meta:</strong> Seguir rigorosamente os
            Termos de Serviço do WhatsApp Business API e Políticas da Plataforma
            Meta.
          </li>
        </ul>
        <p>
          <strong>Responsabilidade por conteúdo:</strong> Você é o único
          responsável pelo conteúdo enviado através da plataforma e por suas
          interações com usuários finais. Não nos responsabilizamos por disputas,
          danos ou violações decorrentes do conteúdo que você compartilha.
        </p>
      </section>

      <section id="limitacao-responsabilidade" className="scroll-mt-20">
        <h2>9. Limitação de Responsabilidade</h2>
        <p>
          O MendoHub é fornecido "no estado em que se encontra" (as is), sem
          garantias expressas ou implícitas de qualquer tipo.
        </p>
        <p>
          <strong>Não nos responsabilizamos por:</strong>
        </p>
        <ul>
          <li>
            <strong>Indisponibilidade da API do WhatsApp:</strong> Falhas,
            limitações ou mudanças nas políticas da Meta/WhatsApp estão fora do
            nosso controle.
          </li>
          <li>
            <strong>Bloqueio de número:</strong> Se seu número de WhatsApp
            Business for bloqueado pela Meta por violar suas políticas, não somos
            responsáveis.
          </li>
          <li>
            <strong>Perda de dados:</strong> Embora mantenhamos backups, não
            garantimos recuperação total em caso de falhas catastróficas.
            Recomendamos que você mantenha cópias locais de dados críticos.
          </li>
          <li>
            <strong>Conteúdo gerado por IA:</strong> Mensagens automatizadas
            geradas pelo Claude AI podem ocasionalmente conter imprecisões. Você
            deve revisar e supervisionar respostas automáticas.
          </li>
          <li>
            <strong>Integrações de terceiros:</strong> Problemas em sistemas
            externos (CRM, ERP, webhooks) que afetem o funcionamento.
          </li>
          <li>
            <strong>Lucros cessantes:</strong> Perda de receita, oportunidades de
            negócio ou danos indiretos decorrentes do uso ou incapacidade de usar
            o serviço.
          </li>
        </ul>
        <p>
          <strong>Limite de indenização:</strong> Em hipótese alguma nossa
          responsabilidade total por danos excederá o valor pago por você nos
          últimos 3 (três) meses de serviço.
        </p>
        <p>
          <strong>Exoneração em caso de força maior:</strong> Não seremos
          responsabilizados por falhas causadas por eventos fora do nosso controle
          razoável (desastres naturais, guerras, ataques cibernéticos massivos,
          mudanças regulatórias).
        </p>
      </section>

      <section id="disponibilidade" className="scroll-mt-20">
        <h2>10. Disponibilidade do Serviço</h2>
        <p>
          Nos esforçamos para manter o MendoHub disponível 24 horas por dia, 7
          dias por semana, mas não garantimos operação ininterrupta.
        </p>
        <p>
          <strong>Manutenções programadas:</strong>
        </p>
        <ul>
          <li>
            Podemos realizar manutenções programadas com notificação prévia de
            pelo menos 48 horas via email.
          </li>
          <li>Manutenções geralmente ocorrem em horários de baixo tráfego.</li>
          <li>
            Esforçamo-nos para minimizar o tempo de inatividade durante
            manutenções.
          </li>
        </ul>
        <p>
          <strong>Manutenções emergenciais:</strong>
        </p>
        <ul>
          <li>
            Em caso de problemas críticos de segurança ou estabilidade, podemos
            realizar manutenções emergenciais sem aviso prévio.
          </li>
          <li>
            Notificaremos sobre a natureza do problema assim que possível.
          </li>
        </ul>
        <p>
          <strong>SLA (Acordo de Nível de Serviço):</strong> Dependendo do plano
          contratado, diferentes níveis de disponibilidade e suporte podem ser
          oferecidos. Consulte seu contrato específico para detalhes.
        </p>
      </section>

      <section id="pagamento" className="scroll-mt-20">
        <h2>11. Pagamento e Cobrança</h2>
        <p>
          O MendoHub opera em modelo de assinatura recorrente (mensal ou anual)
          com cobrança conforme plano contratado.
        </p>
        <p>
          <strong>Preços e planos:</strong>
        </p>
        <ul>
          <li>Preços estão especificados na página de planos do nosso site.</li>
          <li>
            Planos podem variar conforme número de mensagens, usuários,
            integrações e funcionalidades incluídas.
          </li>
          <li>
            Cobramos antecipadamente no início de cada ciclo de faturamento.
          </li>
        </ul>
        <p>
          <strong>Formas de pagamento:</strong>
        </p>
        <ul>
          <li>
            Cartão de crédito (cobrança automática recorrente via processador
            terceiro)
          </li>
          <li>Boleto bancário (mediante aprovação)</li>
          <li>Transferência bancária (para contratos anuais)</li>
        </ul>
        <p>
          <strong>Atrasos e suspensão:</strong>
        </p>
        <ul>
          <li>
            Pagamentos em atraso resultarão em suspensão do acesso após 7 (sete)
            dias.
          </li>
          <li>
            Após 30 dias de atraso, a conta poderá ser cancelada e dados
            excluídos conforme nossa política de retenção.
          </li>
          <li>
            Multa de 2% sobre o valor devido + juros de 1% ao mês em caso de
            atraso.
          </li>
        </ul>
        <p>
          <strong>Reajustes:</strong> Preços podem ser reajustados anualmente
          conforme inflação (IPCA ou IGP-M) com aviso prévio de 30 dias.
        </p>
        <p>
          <strong>Impostos:</strong> Valores não incluem impostos aplicáveis
          (ISS, PIS, COFINS, etc.), que serão adicionados conforme legislação
          vigente.
        </p>
      </section>

      <section id="cancelamento" className="scroll-mt-20">
        <h2>12. Cancelamento e Suspensão</h2>
        <p>
          <strong>Cancelamento por você:</strong>
        </p>
        <ul>
          <li>
            Você pode cancelar sua assinatura a qualquer momento através do
            dashboard ou entrando em contato com nosso suporte.
          </li>
          <li>
            O cancelamento entrará em vigor ao final do período de faturamento
            atual (não há reembolso proporcional).
          </li>
          <li>
            Após o cancelamento, você terá 30 dias para exportar seus dados antes
            da exclusão definitiva.
          </li>
        </ul>
        <p>
          <strong>Cancelamento por nós:</strong>
        </p>
        <p>Podemos suspender ou cancelar sua conta imediatamente se:</p>
        <ul>
          <li>Você violar estes Termos de Uso ou nossa Política de Privacidade</li>
          <li>Detectarmos atividades fraudulentas ou uso abusivo</li>
          <li>Seu número de WhatsApp for bloqueado pela Meta</li>
          <li>Houver inadimplência superior a 30 dias</li>
          <li>Recebermos ordem judicial ou requisição de autoridade competente</li>
        </ul>
        <p>
          Em caso de violação grave, o cancelamento será imediato sem reembolso
          de valores pagos.
        </p>
        <p>
          <strong>Dados após cancelamento:</strong> Conforme Política de
          Privacidade, mantemos dados por 6 meses após cancelamento para fins
          fiscais e contratuais, após o que serão permanentemente excluídos.
        </p>
      </section>

      <section id="modificacoes" className="scroll-mt-20">
        <h2>13. Modificações nos Termos</h2>
        <p>
          Reservamos o direito de modificar estes Termos de Uso a qualquer
          momento para refletir mudanças em nossos serviços, legislação ou
          práticas comerciais.
        </p>
        <p>
          <strong>Notificação de mudanças:</strong>
        </p>
        <ul>
          <li>
            Alterações significativas serão notificadas por email com pelo menos
            15 dias de antecedência.
          </li>
          <li>
            Publicaremos um aviso destacado no dashboard da plataforma.
          </li>
          <li>A data de "Última atualização" será atualizada no topo da página.</li>
        </ul>
        <p>
          <strong>Aceitação de mudanças:</strong> O uso continuado do serviço
          após a publicação de alterações constitui aceitação dos novos termos. Se
          você não concordar com as mudanças, deve cancelar sua conta antes da
          data de vigência.
        </p>
      </section>

      <section id="rescisao" className="scroll-mt-20">
        <h2>14. Rescisão</h2>
        <p>
          Tanto você quanto nós podemos rescindir o contrato de serviço a
          qualquer momento, observando os termos de cancelamento descritos na
          seção 12.
        </p>
        <p>
          <strong>Efeitos da rescisão:</strong>
        </p>
        <ul>
          <li>Acesso à plataforma será imediatamente revogado</li>
          <li>
            Integrações via webhook e API serão desativadas
          </li>
          <li>
            Mensagens pendentes de envio não serão processadas
          </li>
          <li>
            Você terá 30 dias para exportar seus dados antes da exclusão
            definitiva
          </li>
        </ul>
        <p>
          <strong>Sobrevivência de cláusulas:</strong> As seções sobre
          Propriedade Intelectual, Limitação de Responsabilidade, Indenização, Lei
          Aplicável e Resolução de Disputas permanecerão válidas após a rescisão.
        </p>
      </section>

      <section id="indenizacao" className="scroll-mt-20">
        <h2>15. Indenização</h2>
        <p>
          Você concorda em indenizar, defender e isentar Cleyton Mendes, seus
          funcionários, parceiros e prestadores de serviço de qualquer
          reivindicação, dano, perda, responsabilidade, custo ou despesa
          (incluindo honorários advocatícios) decorrentes de:
        </p>
        <ul>
          <li>Seu uso indevido da plataforma</li>
          <li>Violação destes Termos de Uso ou da Política de Privacidade</li>
          <li>
            Violação de direitos de terceiros (propriedade intelectual,
            privacidade, etc.)
          </li>
          <li>
            Conteúdo enviado por você através da plataforma
          </li>
          <li>Violação de leis ou regulamentos aplicáveis</li>
          <li>Violação dos Termos de Serviço da Meta/WhatsApp</li>
        </ul>
        <p>
          Esta obrigação de indenização permanecerá válida mesmo após o término
          do contrato.
        </p>
      </section>

      <section id="lei-aplicavel" className="scroll-mt-20">
        <h2>16. Lei Aplicável</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do
          Brasil, incluindo mas não se limitando a:
        </p>
        <ul>
          <li>
            Lei nº 13.709/2018 (Lei Geral de Proteção de Dados - LGPD)
          </li>
          <li>Lei nº 12.965/2014 (Marco Civil da Internet)</li>
          <li>Lei nº 8.078/1990 (Código de Defesa do Consumidor)</li>
          <li>Lei nº 10.406/2002 (Código Civil)</li>
        </ul>
        <p>
          Quaisquer disputas serão resolvidas de acordo com a legislação
          brasileira, sem considerar conflitos de leis.
        </p>
      </section>

      <section id="resolucao-disputas" className="scroll-mt-20">
        <h2>17. Resolução de Disputas</h2>
        <p>
          <strong>Tentativa de resolução amigável:</strong> Antes de iniciar
          qualquer procedimento formal, as partes concordam em tentar resolver
          disputas de forma amigável através de negociação direta por até 30
          dias.
        </p>
        <p>
          <strong>Foro:</strong> Caso a resolução amigável não seja possível,
          fica eleito o foro da comarca do Rio de Janeiro, RJ, Brasil, para
          dirimir quaisquer questões oriundas destes Termos de Uso, com exclusão
          de qualquer outro, por mais privilegiado que seja.
        </p>
        <p>
          <strong>Arbitragem (opcional):</strong> Para contratos de valor
          superior a R$ 50.000,00 anuais, as partes podem optar por arbitragem
          conforme Lei nº 9.307/1996, através de câmara arbitral mutuamente
          acordada.
        </p>
      </section>

      <section id="disposicoes-gerais" className="scroll-mt-20">
        <h2>18. Disposições Gerais</h2>
        <p>
          <strong>Acordo integral:</strong> Estes Termos de Uso, juntamente com
          a Política de Privacidade, constituem o acordo integral entre você e
          Cleyton Mendes, substituindo todos os acordos anteriores.
        </p>
        <p>
          <strong>Independência das cláusulas:</strong> Se qualquer disposição
          destes termos for considerada inválida ou inexequível, as demais
          cláusulas permanecerão em pleno vigor e efeito.
        </p>
        <p>
          <strong>Não renúncia:</strong> O não exercício de qualquer direito
          previsto nestes termos não constituirá renúncia de tal direito.
        </p>
        <p>
          <strong>Cessão:</strong> Você não pode ceder ou transferir seus
          direitos e obrigações sob estes termos sem nosso consentimento prévio
          por escrito. Podemos ceder livremente nossos direitos e obrigações.
        </p>
        <p>
          <strong>Idioma:</strong> Em caso de tradução destes termos para outros
          idiomas, a versão em português brasileiro prevalecerá em caso de
          conflito.
        </p>
        <p>
          <strong>Comunicações:</strong> Todas as notificações formais devem ser
          enviadas por email para os endereços cadastrados ou por correio
          registrado.
        </p>
      </section>

      <section id="contato" className="scroll-mt-20">
        <h2>19. Contato e Suporte</h2>
        <p>
          Para dúvidas sobre estes Termos de Uso, suporte técnico ou questões
          comerciais, entre em contato conosco:
        </p>
        <div className="not-prose bg-muted p-4 rounded-lg my-4">
          <p className="mb-2">
            <strong>MendoHub - Cleyton Mendes</strong>
          </p>
          <p className="mb-2">
            <strong>Email de suporte:</strong>{' '}
            <a href="mailto:contato@cleyton-mendes.com" className="text-primary hover:underline">
              contato@cleyton-mendes.com
            </a>
          </p>
          <p className="mb-2">
            <strong>Endereço:</strong> Rio de Janeiro, RJ - Brasil
          </p>
          <p>
            <strong>Horário de atendimento:</strong> Segunda a Sexta, 9h às 18h
            (horário de Brasília)
          </p>
        </div>
        <p>
          <strong>Prazo de resposta:</strong> Responderemos todas as solicitações
          de suporte em até 24 horas úteis para planos pagos (planos premium podem
          ter SLA diferenciado).
        </p>
        <p className="text-sm text-muted-foreground mt-6">
          <strong>Última atualização:</strong> {lastUpdated}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Ao utilizar o MendoHub, você declara ter lido, compreendido e aceito
          integralmente estes Termos de Uso e nossa Política de Privacidade.
        </p>
      </section>
    </LegalLayout>
  );
}

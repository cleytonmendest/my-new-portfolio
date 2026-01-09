import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { TableOfContents } from '@/components/legal/table-of-contents';

export const metadata: Metadata = {
  title: 'Política de Privacidade - MendoHub',
  description:
    'Política de privacidade do MendoHub - Como coletamos, usamos e protegemos seus dados.',
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = '09 de janeiro de 2026';

const tocItems = [
  { id: 'introducao', title: '1. Introdução', level: 2 },
  { id: 'dados-coletados', title: '2. Dados Coletados', level: 2 },
  {
    id: 'dados-que-coletamos',
    title: '2.1 Dados que Coletamos',
    level: 3,
  },
  {
    id: 'dados-que-nao-coletamos',
    title: '2.2 Dados que NÃO Coletamos',
    level: 3,
  },
  { id: 'finalidade', title: '3. Finalidade da Coleta', level: 2 },
  { id: 'base-legal', title: '4. Base Legal (LGPD)', level: 2 },
  { id: 'compartilhamento', title: '5. Compartilhamento de Dados', level: 2 },
  {
    id: 'com-quem-compartilhamos',
    title: '5.1 Com Quem Compartilhamos',
    level: 3,
  },
  {
    id: 'nao-compartilhamos',
    title: '5.2 Não Compartilhamos Com',
    level: 3,
  },
  { id: 'retencao', title: '6. Retenção de Dados', level: 2 },
  { id: 'direitos', title: '7. Direitos do Usuário', level: 2 },
  { id: 'seguranca', title: '8. Segurança', level: 2 },
  {
    id: 'transferencia-internacional',
    title: '9. Transferência Internacional de Dados',
    level: 2,
  },
  { id: 'cookies', title: '10. Cookies e Tecnologias', level: 2 },
  { id: 'alteracoes', title: '11. Alterações na Política', level: 2 },
  { id: 'contato', title: '12. Contato e DPO', level: 2 },
  { id: 'jurisdicao', title: '13. Lei Aplicável e Jurisdição', level: 2 },
];

export default function PoliticaPrivacidadePage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      lastUpdated={lastUpdated}
      otherPageTitle="Termos de Uso"
      otherPageHref="/whatsapp-bot/termos-de-uso"
      tableOfContents={<TableOfContents items={tocItems} />}
    >

      <section id="introducao" className="scroll-mt-20">
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo à Política de Privacidade do <strong>MendoHub</strong>, um
          serviço de plataforma de automação de atendimento via WhatsApp
          operado por <strong>Cleyton Mendes</strong>.
        </p>
        <p>
          O MendoHub é uma solução tecnológica (SaaS) que permite a empresas
          automatizar e gerenciar conversas com seus clientes através da API
          oficial do WhatsApp Business fornecida pela Meta Platforms, Inc.
          (Facebook).
        </p>
        <p>
          Esta política descreve como coletamos, usamos, armazenamos,
          compartilhamos e protegemos os dados pessoais dos usuários finais
          (pessoas que interagem com os números de WhatsApp Business dos nossos
          clientes) e dos nossos clientes empresariais.
        </p>
        <p>
          Levamos a privacidade a sério e estamos comprometidos com a proteção
          de dados em conformidade com a Lei Geral de Proteção de Dados (LGPD -
          Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e
          as políticas da Meta/WhatsApp Business API.
        </p>
        <p>
          Ao utilizar nossos serviços ou interagir com números de WhatsApp
          Business que utilizam o MendoHub, você concorda com as práticas
          descritas nesta política.
        </p>
      </section>

      <section id="dados-coletados" className="scroll-mt-20">
        <h2>2. Dados Coletados</h2>

        <h3 id="dados-que-coletamos">2.1 Dados que Coletamos</h3>
        <p>
          Para fornecer nossos serviços de automação de atendimento via
          WhatsApp, coletamos e processamos os seguintes tipos de dados:
        </p>
        <ul>
          <li>
            <strong>Número de telefone:</strong> O número de WhatsApp do
            usuário final é fornecido automaticamente pela API do WhatsApp
            Business da Meta quando uma conversa é iniciada.
          </li>
          <li>
            <strong>Conteúdo das mensagens:</strong> Todo o conteúdo de texto,
            áudio, imagem, vídeo, documento ou outro tipo de mídia enviado e
            recebido através da plataforma.
          </li>
          <li>
            <strong>Timestamp das interações:</strong> Data e hora em que cada
            mensagem foi enviada ou recebida.
          </li>
          <li>
            <strong>Metadados da conversa:</strong> Informações sobre o status
            das mensagens (enviada, entregue, lida, falha), tipo de mídia,
            tamanho de arquivo, etc.
          </li>
          <li>
            <strong>Nome do contato:</strong> Quando disponível através do
            perfil do WhatsApp do usuário.
          </li>
          <li>
            <strong>Dados do cliente empresarial:</strong> Nome da empresa,
            CNPJ, email, telefone, endereço comercial, dados de faturamento e
            credenciais de acesso à plataforma.
          </li>
          <li>
            <strong>Dados técnicos:</strong> Endereço IP, tipo de dispositivo,
            navegador, sistema operacional (apenas para acesso ao dashboard de
            gerenciamento pelos clientes).
          </li>
        </ul>

        <h3 id="dados-que-nao-coletamos">2.2 Dados que NÃO Coletamos</h3>
        <p>
          Para proteger a privacidade dos usuários, não coletamos
          intencionalmente:
        </p>
        <ul>
          <li>Localização em tempo real ou dados de GPS</li>
          <li>Lista completa de contatos do dispositivo</li>
          <li>
            Dados de pagamento direto (quando aplicável, processamos via
            gateway de pagamento terceiro certificado)
          </li>
          <li>Dados sensíveis como orientação sexual, religião ou saúde</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Nota:</strong> Se dados sensíveis forem compartilhados
          voluntariamente por um usuário em uma conversa, serão tratados com o
          mais alto nível de segurança e confidencialidade conforme exigido pela
          LGPD.
        </p>
      </section>

      <section id="finalidade" className="scroll-mt-20">
        <h2>3. Finalidade da Coleta</h2>
        <p>Coletamos e processamos dados pessoais para as seguintes finalidades legítimas:</p>
        <ul>
          <li>
            <strong>Fornecimento do serviço:</strong> Possibilitar a troca de mensagens entre empresas e seus clientes via WhatsApp Business API.
          </li>
          <li>
            <strong>Automação inteligente:</strong> Utilizar inteligência artificial (Claude AI da Anthropic) para análise de contexto, roteamento de conversas e respostas automatizadas.
          </li>
          <li>
            <strong>Armazenamento de histórico:</strong> Manter registro das conversas para que clientes empresariais possam acessar o histórico de atendimento.
          </li>
          <li>
            <strong>Integração com sistemas:</strong> Conectar com CRMs, ERPs e outros sistemas dos clientes para enriquecer o atendimento.
          </li>
          <li>
            <strong>Notificações via webhook:</strong> Enviar alertas em tempo real sobre novas mensagens para sistemas dos clientes.
          </li>
          <li>
            <strong>Análise de desempenho:</strong> Gerar relatórios agregados (sem identificação individual) sobre volume de mensagens, tempo de resposta e satisfação.
          </li>
          <li>
            <strong>Melhoria do serviço:</strong> Analisar padrões de uso (anonimizados) para otimizar a plataforma.
          </li>
          <li>
            <strong>Cumprimento legal:</strong> Atender solicitações de autoridades competentes quando exigido por lei.
          </li>
        </ul>
      </section>

      <section id="base-legal" className="scroll-mt-20">
        <h2>4. Base Legal (LGPD)</h2>
        <p>O tratamento de dados pessoais no MendoHub está fundamentado nas seguintes bases legais previstas no Art. 7º da LGPD:</p>
        <ul>
          <li>
            <strong>Execução de contrato (Art. 7º, V):</strong> O processamento de dados é necessário para cumprir obrigações contratuais com nossos clientes empresariais.
          </li>
          <li>
            <strong>Legítimo interesse (Art. 7º, IX):</strong> Processamos dados para melhorar nossos serviços, prevenir fraudes e garantir a segurança da plataforma.
          </li>
          <li>
            <strong>Consentimento explícito:</strong> Ao iniciar uma conversa com um número de WhatsApp Business que utiliza o MendoHub, o usuário final consente com o processamento de suas mensagens conforme esta política.
          </li>
          <li>
            <strong>Cumprimento de obrigação legal (Art. 7º, II):</strong> Quando exigido por lei, regulamento ou ordem judicial.
          </li>
        </ul>
        <p>
          Os clientes empresariais (controladores de dados) são responsáveis por obter consentimento adequado de seus próprios clientes quando necessário, conforme suas políticas de privacidade e termos de uso.
        </p>
      </section>

      <section id="compartilhamento" className="scroll-mt-20">
        <h2>5. Compartilhamento de Dados</h2>

        <h3 id="com-quem-compartilhamos">5.1 Com Quem Compartilhamos</h3>
        <p>Compartilhamos dados pessoais apenas com as seguintes partes, sempre com garantias contratuais de proteção:</p>
        <ul>
          <li>
            <strong>Meta Platforms (WhatsApp):</strong> Dados são transmitidos através da API oficial do WhatsApp Business conforme os Termos de Serviço da Meta. A Meta tem acesso aos dados conforme sua própria Política de Privacidade.
          </li>
          <li>
            <strong>Cliente final (controlador de dados):</strong> O dono do número de WhatsApp Business (empresa cliente) tem acesso total aos dados das conversas realizadas através de sua conta.
          </li>
          <li>
            <strong>Anthropic (Claude AI):</strong> Mensagens podem ser processadas pelo modelo de linguagem Claude AI para análise de contexto, classificação de intenção e geração de respostas automatizadas. Anthropic atua como subprocessador sob nosso controle.
          </li>
          <li>
            <strong>Provedores de infraestrutura:</strong>
            <ul>
              <li>Serviços de hosting em nuvem (AWS, Google Cloud, ou similar)</li>
              <li>Banco de dados gerenciado (Supabase, PostgreSQL, ou similar)</li>
              <li>CDN para entrega de mídia</li>
            </ul>
            Todos os provedores possuem certificações de segurança adequadas (ISO 27001, SOC 2, etc.).
          </li>
          <li>
            <strong>Processadores de pagamento:</strong> Quando aplicável, dados de faturamento são compartilhados com gateways de pagamento certificados PCI-DSS.
          </li>
        </ul>

        <h3 id="nao-compartilhamos">5.2 Não Compartilhamos Com</h3>
        <p>Nós <strong>NÃO</strong> compartilhamos, vendemos ou alugamos dados pessoais para:</p>
        <ul>
          <li>Anunciantes ou redes de publicidade</li>
          <li>Empresas de marketing terceiras</li>
          <li>Outros clientes da plataforma (isolamento total entre contas)</li>
          <li>Brokers de dados ou agregadores de informação</li>
        </ul>
      </section>

      <section id="retencao" className="scroll-mt-20">
        <h2>6. Retenção de Dados</h2>
        <p>Mantemos os dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:</p>
        <ul>
          <li>
            <strong>Mensagens e histórico de conversas:</strong> 90 dias (padrão) ou conforme configuração personalizada do cliente empresarial (máximo de 12 meses). Após esse período, dados são automaticamente anonimizados ou excluídos.
          </li>
          <li>
            <strong>Logs de sistema e auditoria:</strong> 30 dias para fins de troubleshooting e segurança.
          </li>
          <li>
            <strong>Dados cadastrais de clientes:</strong> Enquanto a conta estiver ativa + 6 meses após cancelamento (para fins fiscais e contratuais).
          </li>
          <li>
            <strong>Dados financeiros:</strong> 5 anos conforme legislação tributária brasileira.
          </li>
        </ul>
        <p>
          <strong>Direito ao esquecimento:</strong> A qualquer momento, titulares de dados podem solicitar a exclusão definitiva de suas informações, exceto quando a retenção for obrigatória por lei.
        </p>
      </section>

      <section id="direitos" className="scroll-mt-20">
        <h2>7. Direitos do Usuário (Art. 18 da LGPD)</h2>
        <p>Conforme a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
        <ul>
          <li>
            <strong>Confirmação e acesso:</strong> Confirmar se tratamos seus dados e obter acesso a eles.
          </li>
          <li>
            <strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados.
          </li>
          <li>
            <strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar a anonimização, bloqueio ou exclusão de dados desnecessários, excessivos ou tratados em desconformidade.
          </li>
          <li>
            <strong>Portabilidade:</strong> Receber seus dados em formato estruturado e interoperável para transferir a outro fornecedor de serviço.
          </li>
          <li>
            <strong>Informação sobre compartilhamento:</strong> Saber com quais entidades públicas e privadas compartilhamos seus dados.
          </li>
          <li>
            <strong>Revogação do consentimento:</strong> Quando o tratamento for baseado em consentimento, você pode revogá-lo a qualquer momento.
          </li>
          <li>
            <strong>Oposição ao tratamento:</strong> Opor-se ao tratamento realizado com base em legítimo interesse.
          </li>
          <li>
            <strong>Revisão de decisões automatizadas:</strong> Solicitar revisão de decisões tomadas unicamente com base em processamento automatizado.
          </li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, entre em contato conosco através do email:{' '}
          <a href="mailto:contato@cleyton-mendes.com">contato@cleyton-mendes.com</a>
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Prazo de resposta:</strong> Responderemos sua solicitação em até 15 dias corridos conforme estabelecido pela LGPD.
        </p>
      </section>

      <section id="seguranca" className="scroll-mt-20">
        <h2>8. Segurança</h2>
        <p>Implementamos medidas técnicas e organizacionais rigorosas para proteger dados pessoais contra acesso não autorizado, perda, destruição ou alteração:</p>
        <ul>
          <li>
            <strong>Criptografia:</strong> Todos os dados em trânsito são protegidos com TLS 1.3. Dados em repouso são criptografados com AES-256.
          </li>
          <li>
            <strong>Controle de acesso:</strong> Autenticação multifator (MFA), controle de acesso baseado em função (RBAC) e princípio do menor privilégio.
          </li>
          <li>
            <strong>Isolamento de dados:</strong> Cada cliente tem seus dados isolados em namespace separado no banco de dados (arquitetura multi-tenant segura).
          </li>
          <li>
            <strong>Monitoramento:</strong> Logs de auditoria, detecção de anomalias e alertas de segurança em tempo real.
          </li>
          <li>
            <strong>Backups:</strong> Backups automatizados diários com retenção de 30 dias, armazenados em região geográfica diferente.
          </li>
          <li>
            <strong>Testes de segurança:</strong> Pentests periódicos e análise de vulnerabilidades.
          </li>
          <li>
            <strong>Treinamento:</strong> Equipe treinada em boas práticas de segurança e privacidade.
          </li>
        </ul>
        <p>
          <strong>Notificação de incidentes:</strong> Em caso de incidente de segurança que possa representar risco aos seus dados, notificaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados conforme prazos e requisitos da LGPD.
        </p>
      </section>

      <section id="transferencia-internacional" className="scroll-mt-20">
        <h2>9. Transferência Internacional de Dados</h2>
        <p>
          Alguns de nossos prestadores de serviço estão localizados fora do Brasil, resultando em transferência internacional de dados pessoais:
        </p>
        <ul>
          <li>
            <strong>Estados Unidos:</strong>
            <ul>
              <li>Anthropic (Claude AI) - Processamento de linguagem natural</li>
              <li>Provedores de cloud (AWS, Google Cloud) - Infraestrutura</li>
            </ul>
          </li>
          <li>
            <strong>Irlanda (União Europeia):</strong>
            <ul>
              <li>Meta Platforms (WhatsApp) - API oficial do WhatsApp Business</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Garantias de proteção:</strong> Todas as transferências internacionais são realizadas com garantias adequadas conforme Art. 33 da LGPD:
        </p>
        <ul>
          <li>Cláusulas contratuais padrão (Standard Contractual Clauses - SCCs)</li>
          <li>Certificações de segurança (ISO 27001, SOC 2 Type II)</li>
          <li>Compromisso de conformidade com GDPR (quando aplicável)</li>
          <li>Mecanismos de supervisão e auditoria</li>
        </ul>
        <p>
          Para mais informações sobre as garantias específicas de cada prestador de serviço, entre em contato conosco.
        </p>
      </section>

      <section id="cookies" className="scroll-mt-20">
        <h2>10. Cookies e Tecnologias de Rastreamento</h2>
        <p>
          O dashboard de gerenciamento do MendoHub (utilizado por clientes empresariais) utiliza cookies e tecnologias similares para:
        </p>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> Necessários para autenticação e funcionamento básico da plataforma (sessão, CSRF protection).
          </li>
          <li>
            <strong>Cookies de preferência:</strong> Armazenar configurações de idioma, tema (dark/light mode) e layout.
          </li>
          <li>
            <strong>Cookies analíticos:</strong> Entender como a plataforma é utilizada para melhorias (anonimizados).
          </li>
        </ul>
        <p>
          <strong>Não utilizamos:</strong> Cookies de publicidade ou rastreamento comportamental para fins de marketing.
        </p>
        <p>
          Você pode gerenciar cookies através das configurações do seu navegador. Note que desabilitar cookies essenciais pode prejudicar o funcionamento da plataforma.
        </p>
      </section>

      <section id="alteracoes" className="scroll-mt-20">
        <h2>11. Alterações na Política de Privacidade</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas, legislação ou serviços oferecidos.
        </p>
        <p>Quando houver alterações significativas:</p>
        <ul>
          <li>Atualizaremos a data de "Última atualização" no topo desta página</li>
          <li>Notificaremos clientes empresariais por email com pelo menos 15 dias de antecedência</li>
          <li>Publicaremos um aviso destacado no dashboard da plataforma</li>
        </ul>
        <p>
          Recomendamos que você revise esta política periodicamente. O uso continuado dos serviços após a publicação de alterações constitui aceitação das mudanças.
        </p>
      </section>

      <section id="contato" className="scroll-mt-20">
        <h2>12. Contato e Encarregado de Dados (DPO)</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos previstos na LGPD, entre em contato conosco:
        </p>
        <div className="not-prose bg-muted p-4 rounded-lg my-4">
          <p className="mb-2">
            <strong>Controlador de Dados:</strong> Cleyton Mendes
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:contato@cleyton-mendes.com" className="text-primary hover:underline">
              contato@cleyton-mendes.com
            </a>
          </p>
          <p className="mb-2">
            <strong>Endereço:</strong> Rio de Janeiro, RJ - Brasil
          </p>
          <p>
            <strong>Atendimento:</strong> Segunda a Sexta, 9h às 18h (horário de Brasília)
          </p>
        </div>
        <p>
          <strong>Prazo de resposta:</strong> Responderemos todas as solicitações relacionadas a dados pessoais em até 15 dias corridos conforme estabelecido pela LGPD.
        </p>
      </section>

      <section id="jurisdicao" className="scroll-mt-20">
        <h2>13. Lei Aplicável e Jurisdição</h2>
        <p>
          Esta Política de Privacidade é regida pelas leis da República Federativa do Brasil, em especial pela Lei nº 13.709/2018 (LGPD) e pela Lei nº 12.965/2014 (Marco Civil da Internet).
        </p>
        <p>
          Quaisquer disputas relacionadas a esta política serão submetidas ao foro da comarca do Rio de Janeiro, RJ, com exclusão de qualquer outro, por mais privilegiado que seja.
        </p>
        <p className="text-sm text-muted-foreground mt-6">
          <strong>Última atualização:</strong> {lastUpdated}
        </p>
      </section>
    </LegalLayout>
  );
}

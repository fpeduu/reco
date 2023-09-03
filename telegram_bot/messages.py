ECHO_MSG = """
Sinto muito, não entendi o que você quis dizer.
Se você gostaria de iniciar um acordo, digite:
/start 123.456.789-00
Onde 123.456.789-00 é o seu CPF.
"""

NO_CPF_MSG = """
Por favor, digite o comando /start seguido do seu CPF.
"""

DEBTOR_NOT_FOUND_MSG = """
Não foi possível identificar o CPF informado. Por favor, tente novamente.
"""

NEW_DEBTOR_INFOS_MSG = """
Olá, {}! Identificamos que você mora no condomínio {}.
Você possui uma dívida de R${:,.0f} e está sem pagar há mais de {} dias.
Gostaria de iniciar um acordo?
"""

OLD_DEBTOR_INFOS_MSG = """
Olá, {}! Identificamos que você mora no condomínio {}.
Você possui uma dívida de R${:,.0f} e tem o seguinte acordo em andamento:
Valor de entrada: R${:,.0f}
Quantidade de parcelas: {}
Gostaria de editar o acordo?
"""

ERROR_MSG = """
Sinto muito, não consegui prosseguir com a operação. Por favor, tente novamente mais tarde.
"""

MAX_LIMIT_MSG = """
Esta ação excede o limite viável para o acordo.
"""

ASK_ENTRY_MSG = """
Primeiro, digite o valor de entrada que você sugere pagar.
Você pode digitar um valor ou usar os botões abaixo.
Valor de entrada: R${:,.0f}
"""

ASK_INSTALLMENTS_MSG = """
Agora, digite a quantidade de parcelas em que você sugere dividir o acordo.
Você pode digitar um valor ou usar os botões abaixo.
Quantidade de parcelas: {}
"""

ASK_CONFIRMATION_MSG = """
Você gostaria de propor o seguinte acordo?
Valor de entrada: R${:,.0f}
Quantidade de parcelas: {}
"""

RETRY_AGREEMENT_MSG = """
O que você gostaria de alterar?
"""

FINISH_AGREEMENT_MSG = """
Seu acordo foi proposto com sucesso!
Você pode fazer o download do seu acordo através do link:
{}
"""
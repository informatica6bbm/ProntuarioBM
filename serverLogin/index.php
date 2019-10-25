<?php
    define("LDAPDN", "dc=cbm,dc=sc,dc=gov,dc=br");

	$usuario = $_GET['usuario'];
	$passwd = $_GET['passwd'];

    function ldap($username, $password){
        $erro_ldap = "";
        $resposta = true;

        $connect = ldap_connect('ldap://ldap.cbm.sc.gov.br');

        if($connect){
            ldap_set_option($connect, LDAP_OPT_DEREF, 3);

            try {
                $bind = ldap_bind($connect);
            } catch (\Exception $e) {
                return false;
            }
            if($bind == false){
                $resposta = false;
            } elseif(($res_id = ldap_search($connect, LDAPDN, "uid=$username")) == false){
                $resposta = false;
            } elseif(ldap_count_entries($connect, $res_id) != 1) {
                $resposta = false;
            } elseif(($entry_id = ldap_first_entry($connect, $res_id))== false){
                $resposta = false;
            } elseif(($user_dn = ldap_get_dn($connect, $entry_id)) == false){
                $resposta = false;
            } elseif(($link_id = @ldap_bind($connect, $user_dn, $password)) == false) {
                $resposta = false;
            }

            ldap_close($connect);
        }else{
            $resposta = false;
        }
        return $resposta;
    }

    echo !ldap($usuario, $passwd);
?>

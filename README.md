
##Panamen.io
=========

API para servicios publicos de Panama, Republica de Panama

###REST API Spec
###Servicios Publicos
####/api/gob/servicio

Ejemplo
/api/gob/idaan/:numeroCuenta

###Servicios Comerciales
####/api/com/servicio

Ejemplo
/api/com/metrobus/:codigo


###Patrones

**lib** contiene los modelos, cada modelo debe tener metodos **fetch** y **parse**

**spec** contiene los specs al modelo. Por lo general queremos probar la logica de **parse**.

###Adicional
Los contribuidores deben fork y enviar Pull Request.
Los non developers deben abrir issues y proponer y argumentar sus ideas.

Rogelio Morrell C. Benevolent Panamenio.
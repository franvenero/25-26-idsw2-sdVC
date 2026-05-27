@startuml eliminarAula-analisis
skinparam linetype polyline

rectangle #CDEBA5 ":Aulas Abierto" as AulasAbierto
rectangle #CDEBA5 ":Aula Abierta" as AulaAbierta
rectangle #CDEBA5 ":Collaboration AbrirAulas" as AbrirAulas

package eliminarAula as "eliminarAula()" {
    rectangle #629EF9 EliminarAulaView
    rectangle #b5bd68 AulaController
    rectangle #F2AC4E AulaRepository
    rectangle #F2AC4E Aula
}

AulasAbierto --> EliminarAulaView: eliminarAula(aulaId)
AulaAbierta --> EliminarAulaView: eliminarAula(aulaId)

EliminarAulaView -d-> AulaController: cargarAulaParaEliminacion(aulaId) : Aula

AulaController --> AulaRepository: obtenerPorId(aulaId) : Aula

AulaRepository -- Aula

EliminarAulaView --> AulaController: eliminarAula(aulaId) : void

AulaController --> AulaRepository: eliminar(aulaId) : void

EliminarAulaView ..> AbrirAulas: <<include>> abrirAulas()

@enduml
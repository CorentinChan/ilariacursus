

class animal:
    def getPrice(regime,quantite):
        price=quantite
        if(regime=="carnivore"):
            price=quantite*10
        return price
    
    def display(infos):
        for info in infos:
            print(info)
  

class carnivore:
    def __init__(self, nom, regime, quantite):
        animal()
        self.nom=nom
        self.regime=regime
        self.quantite=quantite
    def getPrice(self):
        return self.quantite*10
    def display(self):
        print(self.nom,self.regime,self.quantite, self.getPrice())

        

class vegetarien:
    def __init__(self, nom, regime, quantite):
        animal()
        self.nom=nom
        self.regime=regime
        self.quantite=quantite
    def getPrice(self):
        return self.quantite
    
    def display(self):
        print(self.nom,self.regime,self.quantite, self.getPrice())
      
              

tigre= carnivore("tigre","carnivore",5)
print(tigre.nom,tigre.regime,tigre.quantite, tigre.getPrice())

chimpanze= vegetarien("tigre","carnivore",5)
print(chimpanze.nom,chimpanze.regime,chimpanze.quantite, chimpanze.getPrice())


chimpanze.display()

class Zoo:
    def __init__(self, nom):
        self.nom = nom
        self.animaux = []

    def ajouter_animal(self, animal):
        self.animaux.append(animal)
        print(f"{animal.nom} a été ajouté au zoo {self.nom}.")

    def supprimer_animal(self, nom_animal):
        for a in self.animaux:
            if a.nom == nom_animal:
                self.animaux.remove(a)
                print(f"{a.nom} a été supprimé du zoo {self.nom}.")
                return
        print(f"Aucun animal nommé {nom_animal} n’a été trouvé dans le zoo.")

    def nombre_animaux(self):
        return len(self.animaux)

    def cout_total_nourriture(self):
        return sum(a.cout_nourriture() for a in self.animaux)

    def afficher_animaux(self):
        print(f"\n--- Animaux du zoo {self.nom} ---")
        for a in self.animaux:
            a.afficher()
        print(f"Coût total de la nourriture : {self.cout_total_nourriture()} €/jour\n")

# Création du zoo
zoo = Zoo("prisonpouranimaux")

# Ajout des animaux
tigrou = tigre("Tigrou",poids=120)
chita = chimpanze("Chita", poids=30)

zoo.ajouter_animal(tigrou)
zoo.ajouter_animal(chita)

zoo.afficher_animaux()
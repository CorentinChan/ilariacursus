def add(a,b) :
    print(a+b)

def inc(b) :
    i=1
    while i<b :
        print(i)
        i+=1
    else :
        print("i>4.5")


tab=[]
for i in range(20):
    tab.append(7*i)
    
print(tab)

euros=1
while euros < 1650 :
    print('euros : ',euros,'dollars canadien',euros*1.65)
    euros=euros*2

def suiteTriple(n) :
    tab2=[n]
    print(n)
    for i in range(12):
        n=n*3
        tab[i+1]=n
    print(n)
    return tab

print("suite triple",suiteTriple(2))
    
def volumePar(long,larg,prof) :
    print("volume parallepide : " , long*larg*prof)
    return long*larg*prof
volumePar(2,5,6)

def convertSec(n) :
    secondes= n%60
    n=n/60
    minutes=int(n%60)
    n= n/60
    heures=int(n%24)
    n= n/24
    jours= int(n%365)
    n=n/365
    annees=int(n)

    print("année :", annees,", jours : ", jours, " heures : ", heures,", minutes : ",minutes,", secondes : ",secondes)
convertSec(5000)


tab2=[""]
div=[]

for i in range(20):

   
    if (7*i)%3==0 :
        tab2.append(i)
        print(7*i,"divisible par 3")
    else :
        tab2.append(i)
        print(7*i)
 
for i in range(50) :
    if (13*i)%7==0 :
        print (13*i)

for i in range(7) :
    print("*"*i)     

    ##exo 5

t1=[31,28,31]
t2=["janvier","fevrier","mars"]
resultat = [val for pair in zip(t1, t2) for val in pair]
print(resultat)

tmax=[5,6,8,4,15,44,88,3]

print('max : ' ,max(tmax))

nbMax=0
for i in tmax :
    if nbMax<i :
        nbMax=i
print("nb max = ",nbMax)

tp,ti=[],[]
for i in tmax :
    print(i)
    if i %2 ==0 :
        tp.append(i)
    else :
        ti.append(i)

print("nb pairs : ",tp,"nb impairs", ti)



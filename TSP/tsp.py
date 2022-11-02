import math as m
import time
import random as r
import sys

all_list = []
v1 = open(sys.argv[1],"r")
v2 = v1.read()
v3 = v2.split("\n")   
n = int(v3[1])
begin = time.time()
for i in range(0,n):
    all_list.append(v3[n+i+2].split())

def cost(index):
    path_cost=float(all_list[index[0]][index[len(index)-1]])
    for i in range(1,n):
        path_cost = path_cost + float(all_list[index[i]][index[i-1]])
    return path_cost

way = list(range(0,n))
Tempval=0.0
for i in range(0,n):
    temp=way.copy()
    r.shuffle(temp)
    Tempval+=abs(cost(temp)-cost(way))

Tempval=Tempval/(7*n)
initial_T=Tempval
best = cost(way)
present = best
variable0 = 0
NumOfIter=n*2
if n<101:
    NumOfIter+=n*8
end = time.time()
while(end-begin<299 and Tempval>0.01):
    variable0=variable0+1
    var2=cost(way)
    for variable1 in range(0,NumOfIter):
        temp=way.copy()
        beginning=r.randrange(0,n,1)
        final=r.randrange(1,n,1)
        temp[beginning:final]=temp[beginning:final][::-1]
        present = cost(temp)
        if(present<best):
            print("Path cost: ", present)
            for i in temp:
                print(i,end=' ')
            print()
            best=present
        probability=1/(1+(m.exp((-1)*(present-cost(way))/(Tempval))))
        if(probability<r.random()):
            way=temp

    if n<102:
        variable_0=-0.003*variable0        
    elif n>101 and n<401:
        variable_0=-0.005*variable0
    else:
        variable_0=-0.009*variable0
    Tempval=initial_T*m.exp(variable_0)
    end = time.time()

"""
Importing necessary modules
"""

from sympy.core import symbols, diff
import numpy as np, math
from numpy.linalg import multi_dot
from sympy import *
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from math import sqrt
plt.rcParams["figure.figsize"] = (10,10)

"""Declaring variables and storing values of u in an array as [0,0.1,0.2.....1] (u_val) and v in an array as [0,0.1,0,2.....1] (v_val)."""

u=symbols('u')
v=symbols('v')
xp=symbols('x')
yp=symbols('y')
u_val=np.linspace(0,1,10)
v_val=np.linspace(0,1,10)

"""Defining function bernstein_poly which takes input i,n and the parameter and returns the bernstein polynomial."""

def bernstein_poly(i, n, t):
    """
    Get values of Bernstein polynomial coefficients
    """
    return math.factorial(n)/(math.factorial(i)*math.factorial(n-i)) * (t**(n - i)) * (1 - t)**i

"""Separating the x,y and z coordinates of the control points and storing it in xPoints, yPoints and zPoints respectively.

"""

def controlPoints(grid):
  """
  Separating x, y and z coordinates of control points
  """
  xPoints=np.array([grid[i][j][0] for i in range(len(grid)) for j in range(len(grid[0]))]).reshape(len(grid),len(grid[0]))
  yPoints=np.array([grid[i][j][1] for i in range(len(grid)) for j in range(len(grid[0]))]).reshape(len(grid),len(grid[0]))
  zPoints=np.array([grid[i][j][2] for i in range(len(grid)) for j in range(len(grid[0]))]).reshape(len(grid),len(grid[0]))
  return [xPoints,yPoints,zPoints]

"""Getting the x, y and z coordinates of a point on the bezier surface in terms of parameters u and v. This is obtained by taking dot product of bu (which is a matrix containing berntein polynomial for different values of i and u as parameter), xPoints (containing the x coordinates of the control points) and bv.transpose (which is a matrix containing berntein polynomial for different values of j and v as parameter)."""

def bezier(xPoints,yPoints,zPoints):
  """
  Getting value of p(u,v)
  xVal, yVal and zVal contains x, y and z coordinates in terms of parameters u and v
  """
  bu=np.array([bernstein_poly(i,n_val,u) for i in range(n_val+1)])
  bv=np.array([bernstein_poly(j,m_val,v) for j in range(m_val+1)])
  xVal=factor(multi_dot([bu,xPoints,bv.transpose()]))
  yVal=factor(multi_dot([bu,yPoints,bv.transpose()]))
  zVal=factor(multi_dot([bu,zPoints,bv.transpose()]))
  print("Surface representation p(u,v)")
  print("X coordinates (xVal): ",xVal)
  print("Y coordinates (yVal): ",yVal)
  print("Z coordinates (zVal): ",zVal)
  return [xVal,yVal,zVal]

"""Now that we have the points in their parametric form we are finding the points (x and y coordinates) on the surface by substituting values of u and v.
We are also finding the z coordinates in terms of x and y and substituting the values of x and y to get the coordinates. We are storing the x, y and z coordinates in xpt, ypt and zpt respectively. zTransformed contains z coordinate in terms of x and y.
"""

def bezierPoints(xval,yVal,zVal):
  """
  Getting points on the bezier surface by substituting values of u and v
  """
  xpt,ypt,zpt=[],[],[]
  expr1=Eq(xp,xVal)
  uSub=solve(expr1,u)
  expr2=Eq(yp,yVal)
  vSub=solve(expr2,v)
  zTransformed=factor(zVal.subs([(u,uSub[0]),(v,vSub[0])]))
  for up in u_val:
    xpt.append(xVal.subs([(u,up)]))
    up += 0.1
  for vp in v_val:
    ypt.append(yVal.subs([(v,vp)]))
    vp+=0.1
  xpt, ypt = np.meshgrid(xpt, ypt)
  for i in range(xpt.shape[0]):
    row = []
    for j in range(ypt.shape[1]):
      row.append(zTransformed.subs([(xp, xpt[i][j]), (yp, ypt[i][j])]))
    zpt.append(row)
  return [xpt,ypt,zpt,zTransformed]

"""Main function where the control points are taken as input and all the previously defined functions are called."""

if __name__ == "__main__":
  n_val=int(input("Enter number of rows: "))
  m_val=int(input("Enter number of columns: "))
  # inputGrid=[]
  # for i in range(n_val+1):
  #   row=[]
  #   for j in range(m_val+1):
  #     point=list(map(int,input("Enter point in the form x y z: ").split()))
  #     row.append(point)
  #   inputGrid.append(row)
  inputGrid=[[[0, 0, 0], [0, 50, 18], [0, 100, 24],[0 , 150, 28]],
      [[50, 0, 18], [50, 50, 24], [50, 100, 6],[50 , 150, 30]],
      [[100, 0, 30], [100, 50 , 45], [100, 100 , 30],[100 , 150 , 32]],
      [[150, 0, 30], [150, 50, 36], [150, 100, 30],[150 , 150 , 50]]]
  [xPoints,yPoints,zPoints]=controlPoints(grid=inputGrid)
  [xVal,yVal,zVal]=bezier(xPoints,yPoints,zPoints)
  [xpt,ypt,zpt,zTransformed]=bezierPoints(xVal,yVal,zVal)
  xpt=np.array(xpt)
  ypt=np.array(ypt) 
  zpt=np.array(zpt)

"""Function to plot the wireframe model of the surface using xpt, ypt and zpt

"""

def plot(xpt,ypt,zpt):
  """
  Plotting the bezier surface
  """
  fig = plt.figure()
  ax = fig.add_subplot(111,projection='3d')
  ax.view_init(20, -120)
  ax.plot_wireframe(xpt, ypt, zpt)
  ax.set_xlabel("X")
  ax.set_ylabel("Y")
  ax.set_zlabel("Z")
  ax.set_title("Bezier surface")
plot(xpt,ypt,zpt)

"""We need to calculate the tool spacing as this is the incremental step between 2 consecutive passes of the tool. This is obtained by taking the scallop height from the user as input."""

toolRadius=3.175
def getToolSpacing(toolRadius,scallopHeight):
  """
  Calculating tool spacing
  """
  toolSpacing= sqrt((8*toolRadius*scallopHeight)-(4*(scallopHeight)**2))
  print('Tool Spacing = ',toolSpacing)
  return toolSpacing
scallop_height=float(input("Enter scallop height: "))
toolSpacing=getToolSpacing(toolRadius=toolRadius,scallopHeight=scallop_height)

"""In order to get the incremental steps in each tool pass we need to find the chordal error and for this we need to find the curvature, since curvature at each point can vary here we are finding the maximum curvature in the surface and using it."""

def getMaxCurvature(xpt,ypt,zTransformed):
  """
  Get maximum curvature
  """
  gx=diff(zTransformed,xp)
  gy=diff(zTransformed,yp)
  gxy=diff(gx,yp)
  gxx=diff(gx,xp)
  gyy=diff(gy,yp)
  curvature=(((gxx*(gy**2))-(2*gxy*gx*gy)+(gyy*(gx**2)))/(((gx**2)+(gy**2))**(3/2)))
  maxCurvature=0
  for i in range(xpt.shape[0]):
    row = []
    for j in range(ypt.shape[1]):
      curv=curvature.subs([(xp,xpt[i][j]),(yp,ypt[i][j])])
      if curv>maxCurvature:
        maxCurvature=curv
  return maxCurvature

"""Chordal error is calculated from the maximum curvature and tool radius."""

def getChordalError(xpt,ypt,zTransformed):
  """
  Get chordal error
  """
  maxCurvature=getMaxCurvature(xpt,ypt,zTransformed)
  chordalError=2*sqrt((2*tolerance*(toolRadius+maxCurvature))-(tolerance**2))
  print("Chordal Error: ",chordalError)
  return chordalError
tolerance=float(input("Enter tolerance value: "))
chordalError=getChordalError(xpt,ypt,zTransformed)

"""Now that we have the steps, we find the tool path points and these are stored in xPoints, yPoints and zPoints respectively."""

def getToolPoints(xpt,ypt,zTransformed):
  xmin,xmax=np.amin(xpt),np.amax(xpt)
  ymin,ymax=np.amin(ypt),np.amax(ypt)
  # print(xmin,xmax,ymin,ymax)
  xStart=xmin
  yStart=ymin
  xPoints,yPoints,zPoints=[],[],[]
  yStart=0
  while xStart<xmax:
    # print("HI",xStart)
    while yStart<ymax:
      xPoints.append(xStart)
      yPoints.append(yStart)
      zPoints.append(zTransformed.subs([(xp, xStart), (yp, yStart)]))
      yStart+=chordalError
    xStart+=toolSpacing
    yStart-=chordalError
    while yStart>ymin:
      xPoints.append(xStart)
      yPoints.append(yStart)
      zPoints.append(zTransformed.subs([(xp, xStart), (yp, yStart)]))
      yStart-=chordalError
    xStart+=toolSpacing
    yStart+=chordalError
  return [xPoints,yPoints,zPoints] 
[xPoints,yPoints,zPoints] = getToolPoints(xpt,ypt,zTransformed)
print("Tool Path points: ")
print("X Coordinates: ",xPoints,"\n","Y Coordinates: ",yPoints,"\n","Z Coordinates: ",zPoints)

"""The tool path points are plotted."""

def plotToolPath(xPoints,yPoints,zPoints):
  xPoints=np.array(xPoints)
  yPoints=np.array(yPoints)
  zPoints=np.array(zPoints)
  fig1 = plt.figure()
  ax1 = fig1.add_subplot(111,projection='3d')
  ax1.view_init(20, -120)
  ax1.plot3D(xPoints, yPoints, zPoints)
  ax1.text3D(xPoints[0], yPoints[0], zPoints[0],"Start point")
  ax1.text3D(xPoints[-1], yPoints[-1], zPoints[-1],"End point")
  ax1.set_xlabel("X")
  ax1.set_ylabel("Y")
  ax1.set_zlabel("Z")
  ax1.set_title("Tool path")
plotToolPath(xPoints,yPoints,zPoints)

"""From the tool path points we are generating the NC part program and saving it in \_190030015_.mpf file."""

xPoints=np.array([round(i,3) for i in xPoints])
yPoints=np.array([round(i,3) for i in yPoints])
zPoints=np.array([round(i,3) for i in zPoints])
commands=["G90",
          "G00",
          "G21",
          "G94",
          "set x",
          "set y and z",
          "M3 S1000",
          "G01",
          "F5",
          "move to points",
          "G90",
          "G00",
          "set x",
          "set y and z",
          "M05",
          "M02"]
my_file = open("/content/_190030015_.mpf", 'w')
j=0
def set(i,j,s,a):
  line="N"+'{:03}'.format(j)+" "+s+str(a-2)+"\n"
  return line
def retract(i,j,s,a):
  line="N"+'{:03}'.format(j)+" "+s+str(a)+"\n"
  return line
def moveto(j,s,t,a,b):
  line="N"+'{:03}'.format(j)+" "+"G01 "+s+str(a)+t+str(b)+"\n"
  return line
while commands:
  step=commands.pop(0)
  line="N"+'{:03}'.format(j)+" "
  if step=='set x':
    line+=("X"+str(xPoints[0]+1.000)[:5]+"\n")
  elif step=='set y and z':
    line+=("Y"+str(yPoints[0])+"Z"+str(zPoints[0])+"\n")
  elif step=='move to points':
    my_file.write(set(0,j,'X',xPoints[0]))
    j+=1
    for i in range(1,len(xPoints)):
      if xPoints[i]!=xPoints[i-1]:
        my_file.write(retract(i,j,'X',xPoints[i-1]))
        j+=1
        my_file.write(set(i,j,'Y',yPoints[i]))
        j+=1
        my_file.write(moveto(j,'X','Z',xPoints[i],yPoints[i]))
        j+=1
        my_file.write(retract(i,j,'Y',yPoints[i]))
        j+=1
        my_file.write(set(i,j,'X',xPoints[i]))
        j+=1
      my_file.write(moveto(j,'Y','Z',yPoints[i],zPoints[i]))
      j+=1
  else:
    line+=(step+"\n")
  my_file.write(line)
  j+=1
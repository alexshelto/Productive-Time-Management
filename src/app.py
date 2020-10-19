
# import tkinter as tk
from tkinter import *
from tkinter import messagebox


LARGE_FONT= ("Verdana", 12)
PURPLE="#856ff8"

#Inherits from tk class
class ProductivityApp(Tk):
  
  def __init__(self, *args, **kwargs):
    Tk.__init__(self, *args, **kwargs)
    Tk.wm_title(self, 'Productivity Timer') #title


    container = Frame(self)
    container.pack(side='top', fill='both', expand=True)
    container.grid_rowconfigure(0, weight=1)
    container.grid_columnconfigure(0, weight=1)

    self.displayMenu(container) #displaying menu
    
    



    #rendering frames to the window 
    self.frames = {}  #dict of pages
    frame = SetTimePage(container, self) #initial page
    self.frames[SetTimePage] = frame
    frame.grid(row=0, column=0, sticky='nsew')
  
    self.show_frame(SetTimePage)


  def displayMenu(self, container):
    #menu configuration
    menuBar = Menu(container)
    self.config(menu=menuBar)
    #home menu
    homeBtn = Menu(menuBar)
    homeBtn.add_command(label='Home', command= lambda: messagebox.showinfo("Time Countdown", "Time's up "))
    menuBar.add_cascade(label='Home', menu=homeBtn)
    #my data menu
    myDataBtn = Menu(menuBar)
    myDataBtn.add_command(label='My data', command= lambda: messagebox.showinfo("Time Countdown", "Time's up "))
    menuBar.add_cascade(label='My data', menu=myDataBtn)
    #help menu
    helpBtn = Menu(menuBar)
    helpBtn.add_command(label='How this works', command= lambda: messagebox.showinfo("help page", "help popup"))
    menuBar.add_cascade(label='Help', menu=helpBtn)
    #exit menu 
    exitBtn = Menu(menuBar)
    exitBtn.add_command(label='Exit', command= lambda: messagebox.showinfo("Exit popup", "exit popup"))
    menuBar.add_cascade(label='Help', menu=exitBtn)


  def show_frame(self, cont):
    frame = self.frames[cont]
    frame.tkraise()


class SetTimePage(Frame):
  def __init__(self, parent, controller):
    Frame.__init__(self, parent)
    self.configure(bg=PURPLE)

    #initialization
    label = Label(self, text='Set Productivity', font=LARGE_FONT)
    label.pack(pady=10, padx=10)

    TimeSlider = Scale(self, from_=0, to=60, orient=HORIZONTAL)
    TimeSlider.place(x=20, y=200)
    TimeSlider.configure(bg=PURPLE)

    # button widget
    btn = Button(self, text='Set', bd='4',
             command= submit)
    btn.place(x = 150,y = 210)

def submit():
  pass




if __name__ == '__main__':
  app = ProductivityApp()
  app.geometry("300x250")
  app.mainloop()
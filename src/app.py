
# import tkinter as tk
from tkinter import *


LARGE_FONT= ("Verdana", 12)
PURPLE="#856ff8"

#Inherits from tk class
class ProductivityApp(Tk):
  
  def __init__(self, *args, **kwargs):
    Tk.__init__(self, *args, **kwargs)
    self.geometry("300x250")
    container = Frame(self)
    container.pack(side='top', fill='both', expand=True)
    container.grid_rowconfigure(0, weight=1)
    container.grid_columnconfigure(0, weight=1)
    self.frames = {}


    frame = SetTimePage(container, self) #initial page

    self.frames[SetTimePage] = frame
    frame.grid(row=0, column=0, sticky='nsew')
    frame.configure(bg=PURPLE)
    

    self.show_frame(SetTimePage)


  def show_frame(self, cont):
    frame = self.frames[cont]

    frame.tkraise()


class SetTimePage(Frame):
  def __init__(self, parent, controller):
    Frame.__init__(self, parent)
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
  app.mainloop()
CXX = g++
CXXFLAGS = -std=c++17 -Wall -I. -Iimgui -Iimgui/backends

# Source files for the app, engine core, and ImGui
SRCS = main.cpp \
       imgui/imgui.cpp \
       imgui/imgui_draw.cpp \
       imgui/imgui_tables.cpp \
       imgui/imgui_widgets.cpp \
       imgui/backends/imgui_impl_glfw.cpp \
       imgui/backends/imgui_impl_opengl3.cpp

OBJS = $(SRCS:.cpp=.o)
TARGET = ehowlEngine

# System libraries
LIBS = -lglfw -lGL -ldl -lpthread

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS) $(LIBS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)
